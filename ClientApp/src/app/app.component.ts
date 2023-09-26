import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, inject } from '@angular/core';
import { GitHubService } from './api/services';
import { ContentViewModel } from './api/models';
import { TreeTableModule } from 'primeng/treetable';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contentTree: TreeNode[] = [];
  loading = false;
  CONTENT_COLUMN = [
    { field: 'name', header: 'Name' },
    // { field: 'path', header: 'Path' },
    // { field: 'size', header: 'Size' },
    // { field: 'type', header: 'Type' },
  ]
  private gitHubService = inject(GitHubService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  ngOnInit(): void {

    this.gitHubService.apiGitHubGet$Json().subscribe({
      next: (data) => {
        data.sort((a, b) => (a.contentType!.value! > b.contentType!.value! ? -1 : 1));

        this.contentTree = this.contentListToTreeNodeList(data);
      }
    });

  }
  downloadFile(content: ContentViewModel) {
    window.open('/api/GitHub/' + content.name);
  }
  uploadFile(event: any, fileUpload: any) {
    console.log(event);

    this.loading = true;
    this.gitHubService.apiGitHubPost$Json({
      body: {
        files: event.files
      }
    }).subscribe({
      next: (contentList) => {
        contentList.forEach(content => {
          let findNode = this.contentTree.filter(f => { return f.data.name + '.txt' == content.name });
          if (findNode.length == 0) { this.contentTree = [...this.contentTree, this.contentToTreeNode(content)]; }

        });
        fileUpload.clear();
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Upload fail.' });
        fileUpload.clear();
        this.loading = false;
      },
    });
  }
  onDleteClick(event: Event, treeNode: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteFile(treeNode);
      }
    });
  }

  deleteFile(treeNode: any) {
    this.loading = true;
    console.log(treeNode);
    this.gitHubService.apiGitHubDelete({ body: treeNode.node.data as ContentViewModel }).subscribe({
      next: () => {
        this.contentTree = this.contentTree.filter(f => { return f != treeNode.node });
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete fail.' });
        this.loading = false;
      },
    });
  }

  private contentListToTreeNodeList(contentList: ContentViewModel[]): TreeNode[] {
    let treeNodeList: TreeNode[] = [];
    for (let content of contentList) {
      treeNodeList.push(this.contentToTreeNode(content));
    }
    return treeNodeList;
  }

  private contentToTreeNode(content: ContentViewModel): TreeNode {
    let contentChildren: TreeNode[] = [];

    if (content.child !== null && content.child!.length > 0) {
      for (let c of content.child!) {
        contentChildren.push(this.contentToTreeNode(c));
      }
    }
    return {
      data: {
        name: content.contentType?.value == 1 ? content.name : content.name?.substring(0, content.name.length - 4),
        path: content.path,
        sha: content.sha,
        type: content.contentType?.stringValue,
      },
      children: contentChildren
    };
  }
}

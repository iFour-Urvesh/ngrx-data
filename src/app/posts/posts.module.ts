import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostDataService } from "./post-data.service";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsResolver } from "./posts.resolver";
import { SinglePostComponent } from "./single-post/single-post.component";

const routes : Routes = [
    {path : '', component : PostsListComponent, resolve : { posts : PostsResolver}},
    {path : 'add', component : AddPostComponent},
    {path : 'edit/:id', component : EditPostComponent, resolve : { posts : PostsResolver}},
    {path : 'details/:id', component : SinglePostComponent, resolve : { posts : PostsResolver}},
]

const entityMetadata : EntityMetadataMap = {
    Post : {
        entityDispatcherOptions: {
            optimisticUpdate : true,
            optimisticDelete : true,
        }
    },
}

@NgModule({
    imports : [ CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
    declarations : [
        PostsListComponent,
        SinglePostComponent,
        EditPostComponent,
        AddPostComponent,
    ],
    providers : [PostsResolver, PostDataService]
})
export class PostsModule {
    constructor( eds : EntityDefinitionService , entityDataService : EntityDataService, postDataService : PostDataService){
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Post', postDataService);
      }
}
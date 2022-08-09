import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  editPostForm !: FormGroup;
  id !: string;

  constructor( private postService : PostService, private route : ActivatedRoute, private router : Router){ }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe( posts => {
      const post : Post | undefined = posts.find( post => post.id === this.id);
      this.editPostForm.patchValue({
        title : post?.title,
        description : post?.description,
      })
    });
    
    this.editPostForm = new FormGroup({
      title : new FormControl(null),
      description : new FormControl(null)
    });
  }

  onEditPost(){
    const postData = {
      ...this.editPostForm.value,
      id: this.id,
    }    
    this.postService.update(postData);
    this.router.navigate(['/posts']);
  }
}

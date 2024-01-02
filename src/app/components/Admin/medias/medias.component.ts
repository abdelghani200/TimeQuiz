import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Media } from 'src/app/models/Media';
import { FormconfigService } from 'src/app/services/formconfig.service';
import { AppState } from 'src/app/store/reducers';
import { selectMedias } from 'src/app/store/selectors/media.selectors';
import * as MediaActions from '../../../store/actions/media.actions';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit{

  medias$: Observable<Media[]>;
  currentMedias: Media[] = []

  operation: string = 'add'

  mediaForm!: FormGroup
  selectedMedia: Media | null = null;

  showAddForm = false

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService) {
    this.medias$ = this.store.pipe(select(selectMedias));
    
  }

  ngOnInit(): void {
    this.store.dispatch(MediaActions.loadMedias());
    this.medias$.subscribe(medias => {
      this.currentMedias = medias;
      console.log('Current Medias:', this.currentMedias);
    });
  }

}

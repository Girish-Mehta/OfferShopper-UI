import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { ContactUsComponent } from './contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

       beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ContactUsComponent ],
     imports: [
       BrowserModule,
       FormsModule
     ]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

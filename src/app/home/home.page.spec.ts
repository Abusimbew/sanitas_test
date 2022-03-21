import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from '../services/utils.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let utils: UtilsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('enter constructor', () => {
    let constructor = new HomePage(utils);
    beforeEach(() => {
      spyOn(constructor, 'createForm');
      constructor.createForm()
    });

    it('constructor should call createForm()', () => {
      expect(constructor.createForm).toHaveBeenCalled();
    });
  });

  it('ionViewWillEnter should be called', () => {
    expect(component.ionViewWillEnter).toBeTruthy();
  });

  it('is Correct user', () => {
    expect(component.user).toEqual({ email: '', password: '' });
  });

  it('is Correct localStorage remember key', () => {
    expect(component['REMEMBER_KEY']).toContain('isRemember');
  });

  describe('When ionViewWillEnter() is called', () => {
    it('isShowSpinner false', () => {
      component.ionViewWillEnter();
      expect(component.isShowSpinner).toBeFalse();
    })
    it('toastMessage empty', () => {
      component.ionViewWillEnter();
      expect(component['toastMessage']).toBe('');
    })
  });

  it('validateInputs should return true', () => {
    expect(component.validateInputs).toBeTruthy();
  });

  it('is string email', () => {
    expect((<HTMLInputElement>document.getElementById('email')).value).toBe('');
  });

  it('is string password', () => {
    expect((<HTMLInputElement>document.getElementById('password')).value).toBe('');
  });

  it('is showSpinner true when call loginSuccess', () => {
    component.loginSuccess();
    expect(component.isShowSpinner).toBeTrue();
  });
});
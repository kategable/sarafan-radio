import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './components/callback/callback.component';

export interface IEnvironment {
  api: string;
  path: string;
  production: boolean
  authClient: string;
  authDomain: string;
  callback: string;
}
@NgModule({
  declarations: [CallbackComponent]
})
export class AuthModule {

  public static forRoot(environment: IEnvironment): ModuleWithProviders<AuthModule> {

      return {
          ngModule: AuthModule,
          providers: [
              AuthService,
              {
                  provide: 'env', // you can also use InjectionToken
                  useValue: environment
              }
          ]
      };
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersDomainModule } from '@sarafan/providers/domain';
import { ProvidersSearchComponent } from './search.component';
import { ProvidersRoutingModule } from './providers-routing.module';

@NgModule({
  declarations:[
    ProvidersSearchComponent
  ],
  imports: [
    CommonModule,
    ProvidersDomainModule,
    ProvidersRoutingModule
  ],

})
export class ProvidersFeatureSearchModule {}

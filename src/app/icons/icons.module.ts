import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  remixArrowLeftLine,
  remixArrowRightLine,
  remixExpandUpDownLine,
  remixGlobalFill,
  remixLinkedinFill,
  remixLogoutCircleLine,
  remixLogoutCircleRLine,
  remixSettingsLine,
  remixSparkling2Fill,
  remixUserLine,
} from '@ng-icons/remixicon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      remixArrowRightLine,
      remixArrowLeftLine,
      remixExpandUpDownLine,
      remixUserLine,
      remixSettingsLine,
      remixLogoutCircleLine,
      remixLogoutCircleRLine,
      remixSparkling2Fill,
      remixGlobalFill,
      remixLinkedinFill,
    }),
  ],

  exports: [NgIconsModule],
})
export class IconsModule {}

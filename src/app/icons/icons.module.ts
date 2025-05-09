import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  remixAlertLine,
  remixArrowLeftLine,
  remixArrowRightLine,
  remixExpandUpDownLine,
  remixEyeLine,
  remixEyeOffLine,
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
      remixEyeLine,
      remixEyeOffLine,
      remixAlertLine,
    }),
  ],

  exports: [NgIconsModule],
})
export class IconsModule {}

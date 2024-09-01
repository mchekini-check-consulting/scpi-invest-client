import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { forkJoin } from 'rxjs';
import { UserService } from './core/user/user.service';

export const initialDataResolver = () =>
{
    const navigationService = inject(NavigationService);
    const notificationsService = inject(NotificationsService);
    const userService = inject(UserService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService.get(),
        notificationsService.getAll(),
        userService.get(),
    ]);
};

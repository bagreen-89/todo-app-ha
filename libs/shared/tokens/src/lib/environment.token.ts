import { InjectionToken } from "@angular/core";
import { Environment } from "@todo-app-ha/types";

export const ENVIRONMENT_CONFIG = new InjectionToken<Environment>('ENVIRONMENT_CONFIG');
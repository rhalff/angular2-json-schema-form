var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, WidgetLibraryModule, } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { NoFramework } from '@ngsf/no-framework';
var JsonSchemaFormModule = (function () {
    function JsonSchemaFormModule() {
    }
    JsonSchemaFormModule_1 = JsonSchemaFormModule;
    JsonSchemaFormModule.forRoot = function () {
        var frameworks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            frameworks[_i] = arguments[_i];
        }
        var loadFrameworks = frameworks.length
            ? frameworks.map(function (framework) { return framework.forRoot().providers[0]; })
            : [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule_1,
            providers: __spread([
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService
            ], loadFrameworks),
        };
    };
    var JsonSchemaFormModule_1;
    JsonSchemaFormModule = JsonSchemaFormModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                WidgetLibraryModule,
            ],
            declarations: [JsonSchemaFormComponent],
            exports: [JsonSchemaFormComponent, WidgetLibraryModule],
        })
    ], JsonSchemaFormModule);
    return JsonSchemaFormModule;
}());
export { JsonSchemaFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2pzb24tc2NoZW1hLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFBO0FBQzVDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMvRCxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsbUJBQW1CLEdBQ3BCLE1BQU0sc0JBQXNCLENBQUE7QUFDN0IsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQTtBQUNwRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0JBQW9CLENBQUE7QUFZOUM7SUFBQTtJQWVBLENBQUM7NkJBZlksb0JBQW9CO0lBQ3hCLDRCQUFPLEdBQWQ7UUFBZSxvQkFBYTthQUFiLFVBQWEsRUFBYixxQkFBYSxFQUFiLElBQWE7WUFBYiwrQkFBYTs7UUFDMUIsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU07WUFDdEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQzlELE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQW9CO1lBQzlCLFNBQVM7Z0JBQ1AscUJBQXFCO2dCQUNyQix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtlQUNqQixjQUFjLENBQ2xCO1NBQ0YsQ0FBQTtJQUNILENBQUM7O0lBZFUsb0JBQW9CO1FBVmhDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsbUJBQW1CO2dCQUNuQixtQkFBbUI7YUFDcEI7WUFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxtQkFBbUIsQ0FBQztTQUN4RCxDQUFDO09BQ1csb0JBQW9CLENBZWhDO0lBQUQsMkJBQUM7Q0FBQSxBQWZELElBZUM7U0FmWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtcbiAgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSxcbiAgV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG4gIFdpZGdldExpYnJhcnlNb2R1bGUsXG59IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1Db21wb25lbnR9IGZyb20gJy4vanNvbi1zY2hlbWEtZm9ybS5jb21wb25lbnQnXG5pbXBvcnQge05vRnJhbWV3b3JrfSBmcm9tICdAbmdzZi9uby1mcmFtZXdvcmsnXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtKc29uU2NoZW1hRm9ybUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtKc29uU2NoZW1hRm9ybUNvbXBvbmVudCwgV2lkZ2V0TGlicmFyeU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoLi4uZnJhbWV3b3Jrcyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8SnNvblNjaGVtYUZvcm1Nb2R1bGU+IHtcbiAgICBjb25zdCBsb2FkRnJhbWV3b3JrcyA9IGZyYW1ld29ya3MubGVuZ3RoXG4gICAgICA/IGZyYW1ld29ya3MubWFwKGZyYW1ld29yayA9PiBmcmFtZXdvcmsuZm9yUm9vdCgpLnByb3ZpZGVyc1swXSlcbiAgICAgIDogW3twcm92aWRlOiBGcmFtZXdvcmssIHVzZUNsYXNzOiBOb0ZyYW1ld29yaywgbXVsdGk6IHRydWV9XVxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSnNvblNjaGVtYUZvcm1Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICAgICAgICBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSxcbiAgICAgICAgV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG4gICAgICAgIC4uLmxvYWRGcmFtZXdvcmtzLFxuICAgICAgXSxcbiAgICB9XG4gIH1cbn1cbiJdfQ==
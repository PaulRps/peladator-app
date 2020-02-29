import { StyleManagerService } from './../../services/style-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit {
  themes: any[] = [
    {
      primary: '#f44336',
      accent: '#ef9a9a',
      name: 'default',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      name: 'purple-green',
      isDark: true,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'deeppurple-amber',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      name: 'indigo-pink',
      isDark: false,
    },
  ];
  currentTheme = 'default';

  constructor(private styleManager: StyleManagerService) {}

  ngOnInit() {}

  installTheme(themeName: string) {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);
    if (!theme) {
      return;
    }
    this.currentTheme = theme.name;
    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `./assets/styles/themes/compiled/${theme.name}.css`);
    }
  }
}

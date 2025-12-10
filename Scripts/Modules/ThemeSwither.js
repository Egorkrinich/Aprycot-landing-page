export default class ThemeSwitcher {
  constructor(dataButton) {
    this.switchThemeButton = document.querySelector(`[${dataButton}]`)

    this.isDarkTheme = "dark"

    this.setInitialTheme()
    this.buttonClassManager()
    this.onSwitch()
  }
  themes = {
    dark: 'dark',
    light: 'light',
  }
  get isDarkThemeCached() {
    return localStorage.getItem('theme') === this.themes.dark
  }
  setInitialTheme() {
    document.documentElement.classList.toggle(
      this.isDarkTheme,
      this.isDarkThemeCached
    )
  }
  buttonClassManager() {
    this.switchThemeButton.classList
    .toggle('theme--light', !this.isDarkThemeCached)
    this.switchThemeButton.classList
    .toggle('theme--dark', this.isDarkThemeCached)
  }
  onSwitch() {
    this.switchThemeButton.addEventListener('click', () => {
      localStorage.setItem('theme', 
      this.isDarkThemeCached ?
      this.themes.light : this.themes.dark
      )
      document.documentElement.classList.toggle(this.isDarkTheme)
      this.buttonClassManager()
    })
  }
}
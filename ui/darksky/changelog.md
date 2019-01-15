# 0.6.1
- Added "Today's High" text to current day high temp
- Added Beaufort scale to Wind. Set show_beaufort flag to true to enable
- Added current condition text to current condition icon.  Set entity_current_text to a sensor or template entity to enable.
- Corrected 'it' localization of "feels like".  Changed to "Percepito".
- Corrected 'de' localization of "feels like".  Changed to "Gefühlt".

# 0.5.3
- added **time_format** flag : Overrides locale time format with either 12 or 24 hour time.

# 0.5.2
- Corrected invalid humidity value

# 0.5.1
- Added Dutch (nl) translation for Wind Directions
- Added Feels Like to current temperature
- Added current daytime high forecast
- Added current probability of precipitation
- Added daily forecast probability of precipitation
- Altered the way daily forecast high and low appear
- Added **old_daily_format** flag. Shows old style daily forecast high and low format (values stacked on top of each other).
- Made most current condition items optional
- Removed **Sunset** flag. Adding entity_sun to the configuration will cause the sunset information to appear

# 0.4.1
- Refactored card to use LitElement instead fo HTMLElement
- Moved all CSS style entries into card .js file  .css file is no longer needed
- Added config entries for styling tooltips

# 0.3.1
- added localization for wind direction.  Currently available for en, fr, it and de locales.

# 0.2.3
- Updated dark-sky-animated-weather.css file to align the color scheme of the tooltips with the icon colors.

# 0.2.2
- Fixed bug in Sunrise / Sunset code where invalid object was calling getDate

# 0.2.1
- Added **Locale** flag.  Sets display of day name and time format by Locale specified
- Added **Sunset** flag.  Enables / disables dislay of sunset and sunrise icons and times.

# 0.1.1
- Added configuration flag capability
- Added config flag **tooltips** : Enables/Disables daily summary tooltips
- Added config flag **animated_icons** : Enables/Disables animated icons

# 0.0.1  
Initial Release

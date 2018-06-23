# Car2X

#### Brief introduce
Car2X bases on express + Angulario + Metarial + Woogeen, and front-end code built by webpack. 

#### Open issues
* IntervalObservable has not released when component destroy
* The username show in the banner is hard code. 
* Many conponents have not use the I18N module, but directly use the string.  
* Vehicle information only pull once due to current only have one vehicle and the information won't updated. 2017.09.15, it should be modified to fetch frequently. 
* Woogeen imported by a unnormal way, copy the libs to dist and import from html out of webpack control. 

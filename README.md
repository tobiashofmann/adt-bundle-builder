# Automatic Eclipse with ADT builder

This project builds Eclipse including the [ADT plugin](https://tools.hana.ondemand.com/#abap). The result is a portable version of Eclipse including the ABAP development tools. This portable Version can be used by SAP developers to run their own Eclipse version from a folder, USB drive, or by Citrix admins to provide ADT in a Citrix environment.

## Build

The short version to get your version of Eclipse + ADT:

```sh
npm i
npm start
```

The resulting zip file eclipse-dist.zip in the folder ./dist is your (portable) Eclipse + ADT.

## General information

The target is a Windows version of Eclipse and ADT. Therefore, a Windows computer is required to run the build. The build is done by the Eclipse P2 Director. An Eclipse version is used as the foundation for the build. 

- [P2 Director](https://help.eclipse.org/latest/index.jsp?topic=%2Forg.eclipse.platform.doc.isv%2Fguide%2Fp2_director.html)
- [Eclipse Download](https://www.eclipse.org/downloads/packages/)

The build is done by running a set of [GruntJS](https://www.gruntjs.com) plugins. The starting point of the build process is the downloaded Eclipse ZIP. As Eclipse is not offering a default download URL to get the latest version, the URL needs to be provided manually.

An example URL:
https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2025-03/R/eclipse-jee-2025-03-R-win32-x86_64.zip&mirror_id=1045

## Configuration

The project is delivered with the intention that no additional configuration is needed. Starting the build process will result in a portable Eclipse version ready to be used by SAP developers.

The build configuration can be adjusted by changing the used Eclipse version, or by changing the list of the installed plugins.

### Eclipse

The Eclipse download URL needs to be added as a parameter to the download task in the file Gruntfile.ks

```json
downloadfile: {
  options: {
    dest: './downloads',
    overwriteEverytime: true
  },
  files: {
    'eclipse.zip': 'https://ftp.halifax.rwth-aachen.de/eclipse/technology/epp/downloads/release/2025-03/R/eclipse-jee-2025-03-R-win32-x86_64.zip'
  }
},
```

### Plugins

The build will only add the ADT plugins. All available ADT plugins will be added, including e.g. the ones for WebDynpro ABAP development. The plugins to be installed are povided in the exec parameter:

```json
exec: {
  eclipse: {
    command: 'build\\eclipse\\eclipse.exe -application org.eclipse.equinox.p2.director -repository https://download.eclipse.org/releases/2025-03,https://tools.hana.ondemand.com/latest -installIU com.sap.adt.tools.bopf.devedition.feature.group,com.sap.adt.core.devedition.feature.group,com.sap.adt.tools.hana.devedition.feature.group,com.sap.adt.wda.core.devedition.feature.group,com.sap.adt.pitools.tlf.devedition.feature.group -tag AddADT -destination .\\build\\eclipse -profile epp.package.jee.profile',
    stdout: true,
    stderr: true
  },
},
```

## Run build

The build is started by running:

```sh
npm i
npm start
```

The resulting file eclipse-dist.zip is stored in the folder dist.

## Detailed build information

### Eclipse installation

- Eclipse Update site: 2025-03 - https://download.eclipse.org/releases/2025-03

- Update site ADT https://tools.hana.ondemand.com/latest

### ADT feature IDs

Features

- com.sap.adt.tools.bopf.devedition.feature.group
- com.sap.adt.core.devedition.feature.group
- com.sap.adt.tools.hana.devedition.feature.group
- com.sap.adt.wda.core.devedition.feature.group
- com.sap.adt.pitools.tlf.devedition.feature.group

### (to be added)

ABAP Cleaner

- Update site: https://sap.github.io/abap-cleaner/updatesite
- Feature: com.sap.adt.abapcleaner.feature.feature.group

## Standalone command

Running the complete build process is not necessary. Given that an Eclipse version is available, the P2 director application can be run separately. The command used to add ADT to the Eclipse installation is given here. This is the same command used by the GruntJS exec task in the build script. 

p2 Director Application: eclipsec.exe

Command:

build\eclipse\eclipsec.exe -application org.eclipse.equinox.p2.director -repository https://download.eclipse.org/releases/2025-03,https://tools.hana.ondemand.com/latest -installIU com.sap.adt.tools.bopf.devedition.feature.group,com.sap.adt.core.devedition.feature.group,com.sap.adt.tools.hana.devedition.feature.group,com.sap.adt.wda.core.devedition.feature.group,com.sap.adt.pitools.tlf.devedition.feature.group -tag AddADT -destination .\\build\\eclipse -profile epp.package.jee
# Eclipse ADT bundle builder

This project builds Eclipse including the [ADT plugin](https://tools.hana.ondemand.com/#abap). The result is a portable version of Eclipse including the ABAP development tools. This portable Version can be used by SAP developers to run their own Eclipse version from a folder, USB drive, or by Citrix admins to provide ADT in a Citrix environment.

## Build

The short version to get your version of Eclipse + ADT:

```sh
npm i
npm start
```

The resulting zip file eclipse-dist.zip in the folder ./dist is your (portable) Eclipse + ADT.

## Use case

SAP developers need as an IDE Eclipse with ADT to be able to develop (modern) SAP applications. Features like CDS or RAP are only available in ADT. The installation of ADT is, however, a manual task. Many times, this task is directed to the SAP developers. Meaning: the SAP developer is responsible of building his own IDE. In managed scenarios, where ADT is provided as a package and installed automtically on the developers laptop, the installations are many times outdated. The same holds true for Citrix environments. The bundling of Eclipse with ADT is a manual task. The people charged with this task do this not regularly, resulting in errors during builds and a long time between shipped ADT versions to the SAP developers. Too often, SAP developers have then work with an outdated ADT in Citrix or on their corporate computer. While Eclipse can be used to update ADT automatically, this often does not work due to proxy restrictions, specially in Citrix environments.

### Solution

The goal of this project is provide a tool that builds a ADT bundle on top of Eclipse. This should ereduce the manual work involved and allow companies to ship the latest ADT version fast to their SAP developers.

#### Scenario 1

Have a (automatic) build of Eclipse with ADT included that can be used by SAP developers. The resulting ADT bundle is mainly intended to be used on Citrix. It can also provided as an all-in-one bundle to SAP developers for their computers (laptops). With this, SAP developers do not need to build their own ADT via the "official" way of downloading Eclipse and adding ADT manually.
Windows Teams do not have to build their own ADT bundle manually and distribute it to SAP developer laptops. They can use this bundle; either as-is or as a starting point to add additional plugins.

#### Scenario 2

For Citrix environments, this bundle can be used to easily build a new ADT and provide it to SAP developers working on Citrix.

## Target platform

The target platform of the ADT bundle is: Windows

## Pre-requisites

The latest LTS release from Node.js should be used. As the build is for Windows, a node version manager (nvm) is recommended to install Node.js. Here are some information on how to install Node.js on Windows:

- https://learn.microsoft.com/de-de/windows/dev-environment/javascript/nodejs-on-windows
- https://github.com/coreybutler/nvm-windows#installation--upgrades

## Build information

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
    command: 'build\\eclipse\\eclipse.exe -application org.eclipse.equinox.p2.director -repository https://download.eclipse.org/releases/2025-03,https://tools.hana.ondemand.com/latest,https://sap.github.io/abap-cleaner/updatesite -installIU com.sap.adt.tools.bopf.devedition.feature.group,com.sap.adt.core.devedition.feature.group,com.sap.adt.tools.hana.devedition.feature.group,com.sap.adt.wda.core.devedition.feature.group,com.sap.adt.pitools.tlf.devedition.feature.group,com.sap.adt.abapcleaner.feature.feature.group -tag AddADT -destination .\\build\\eclipse -profile epp.package.jee.profile',
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

The ADT bundle is created using the [Eclipse P2 Director application](https://help.eclipse.org/latest/index.jsp?topic=%2Forg.eclipse.platform.doc.isv%2Fguide%2Fp2_director.html). The build process will instruct the p2 director appplication to connect to the Eclipse update site and to the ADT toooling site to resolve dependencies.

A latest Eclipse (Java Bundle) is used as the source for building the ADT bundle.
Eclipse Downloads: https://www.eclipse.org/downloads/packages/

URL for Eclipse JEE: [Mirror 1045](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2025-03/R/eclipse-jee-2025-03-R-win32-x86_64.zip&mirror_id=1045)

### Eclipse installation

- Eclipse Update site: 2025-03 - https://download.eclipse.org/releases/2025-03
- Update site ADT https://tools.hana.ondemand.com/latest
- Update site ABAP Cleaner https://sap.github.io/abap-cleaner/updatesite

### ADT feature IDs

The following ADT tools / features will be installed:

- com.sap.adt.tools.bopf.devedition.feature.group
- com.sap.adt.core.devedition.feature.group
- com.sap.adt.tools.hana.devedition.feature.group
- com.sap.adt.wda.core.devedition.feature.group
- com.sap.adt.pitools.tlf.devedition.feature.group

### ABAP Cleaner feature IDs

- com.sap.adt.abapcleaner.feature.feature.group

### (to be added)

(further add-ons) 

- tbd

The command to run Eclipse and install ADT is not run by GruntJS. Npm will run the command in a shell. This is because running the command from GruntJS resulted in performance problems or even crashed.

## Standalone command

Running the complete build process is not necessary. Given that an Eclipse version is available, the P2 director application can be run separately. The command used to add ADT to the Eclipse installation is given here. This is the same command used by the npm task.

p2 Director Application: eclipsec.exe

Command:

build\eclipse\eclipsec.exe -application org.eclipse.equinox.p2.director -repository https://download.eclipse.org/releases/2025-03,https://tools.hana.ondemand.com/latest,https://sap.github.io/abap-cleaner/updatesite -installIU com.sap.adt.tools.bopf.devedition.feature.group,com.sap.adt.core.devedition.feature.group,com.sap.adt.tools.hana.devedition.feature.group,com.sap.adt.wda.core.devedition.feature.group,com.sap.adt.pitools.tlf.devedition.feature.group,com.sap.adt.abapcleaner.feature.feature.group -tag AddADT -destination .\\build\\eclipse -profile epp.package.jee
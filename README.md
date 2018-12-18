# Godmachine CTL
A configuration utility for World of Darkness' God Machine.

This is a prop for a tabletop game run by a friend. It writes data to a JSON file that's then encrypted because I'm mean and I didn't want the players tampering with the file. It's encrypted with AES256, a military grade encryption, used in a garage-bodge-project way.

THIS IS NOT A SECURE PIECE OF SOFTWARE

MY ENCRYPTION KEY IS IN THE CODE

I PRAY FOR FORGIVENESS

## Installation
Download the platform-apropriate version of the software on the Releases page of the Github repository and place it wherever on your computer.

For extra credits, rename it to a more apropriate name, such as `godmachine-ctl`.

For extra, extra credits, do add it to your `PATH`.

### Windows path
On windows, press the `windows + pause` keys on your keyboard, or open the Control Panel and go to System. Click on `Advanced System Settings` in the left portion and in the `Advanced` tab, click the `Environment Variables` button. There, in the top box, select the `Path` variable and click `Edit`.

In windows 10, a window with a list opens. Click `New` and add to the end of that list the path to the folder containing the executable for `godmachine-ctl`, then click Ok `Ok` and close everything. In a previous version of Windows, it's just a single text box, but the logic is the same. A list of paths, separated by semicolons (`;`). Add yours to the end, by adding a semicolon and the path to the `godmachine-ctl` folder.

## Usage
### Basic command line information
If you didn't set your path variable, navigate to the folder containing the program using the `cd` and `dir` or `ls` (if on mac or linux) commands. You can then run the program by using the `./[EXECUTABLE NAME]` command. So if you didn't rename the default file, the command would be `./godmachine-ctl-win.exe`. Which is why I recommand that you rename the default file to `godmachine-ctl`, with platform apropriate extension (like `.exe` for windows.) So then the command is `./godmachine-ctl.exe`.

If you did setup your path variable, then it's easy. Open a command prompt wherever and just type in `godmachine-ctl` or whatever the program executable is named in your terminal. Please note that then the `config` file will be created wherever the program is executed. 

So if the program is stored in `C:/Program Files/godmachine-ctl` but run from the command line in `C:/Documents/`, then the `config` file will be stored inside `C:/Documents/`.

### Built-in help
For every command and subcommand, built-in help is available. Simply type in the command and add the `-h` or `--help` parameter to get additional help.

Like so: `godmachine-ctl --help`

Or: `godmachine-ctl configuration --help`

Or: `godmachine-ctl configuration consider --help`

The Help shows you in order:
* How to use the command
* What the command does
* What options are available for that command and what they do
* What subcommands, if any, are available for that command and what they do

### Reading the configuration
`godmachine-ctl configuration show` displays the configuration in JSON in the console.

### Exporting the configuration
`godmachine-ctl configuration export config.json` will export the configuration in a human readable file, instead of the encrypted file used by the software. It will prompt you for a password, which is `atlantislives`.
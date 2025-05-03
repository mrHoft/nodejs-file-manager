const color = {
  red: '\x1b[31m',
  blue: '\x1b[36m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
  arg: '\x1b[96m',
};

export const message = {
  welcome: name =>
    console.log(`${color.blue}Welcome to the File Manager, ${color.arg}${name}${color.blue}!${color.reset}`),
  exit: name =>
    console.log(
      `${color.blue}Thank you for using File Manager, ${color.arg}${name}${color.blue}, goodbye!${color.reset}`
    ),
  dir: name => console.log(`${color.yellow}You are currently in ${color.reset}${name}`),
  invalid: message => console.log(`${color.red}Invalid input: ${color.reset}${message}`),
  error: message => console.log(`${color.red}Operation failed: ${color.reset}${message}`),
  help: () =>
    console.log(`## ${color.blue}List of operations and their syntax:${color.reset}
${color.yellow}   .exit${color.reset}                                           - Finish program
${color.yellow}   up${color.reset}                                              - Go upper from current directory
${color.yellow}   ls${color.reset}                                              - Print list of files and folders
${color.yellow}   cd ${color.arg}path_to_directory${color.reset}                            - Go to dedicated folder
${color.yellow}   cat ${color.arg}path_to_file${color.reset}                                - Print file content
${color.yellow}   add ${color.arg}new_file_name${color.reset}                               - Create empty file
${color.yellow}   mkdir ${color.arg}new_directory_name${color.reset}                        - Create new directory
${color.yellow}   rn ${color.arg}path_to_file new_filename${color.reset}                    - Rename file
${color.yellow}   cp ${color.arg}path_to_file path_to_new_directory${color.reset}           - Copy file
${color.yellow}   mv ${color.arg}path_to_file path_to_new_directory${color.reset}           - Move file
${color.yellow}   rm ${color.arg}path_to_file${color.reset}                                 - Delete file
${color.yellow}   os ${color.arg}--[EOL/cpus/homedir/username/architecture]${color.reset}   - Operating system info
${color.yellow}   hash ${color.arg}path_to_file${color.reset}                               - Hash calculation
${color.yellow}   compress ${color.arg}path_to_file [path_to_destination]${color.reset}     - Compress file
${color.yellow}   decompress ${color.arg}path_to_file [path_to_destination]${color.reset}   - Decompress file`),
  stdin: () =>
    console.log(
      `## ${color.blue}Type your command. Press ${color.yellow}Ctrl+D${color.blue} (Linux/Mac) or ${color.yellow}Ctrl+C${color.blue} (Windows) when done.${color.reset}`
    ),
};

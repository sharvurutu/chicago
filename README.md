## Solution for Chicago Crimes - Data Munging and Visualization Assignment

### Following are the broad tasks:

1. Use Node.js fs module I should read CSV
2. Use Readline interface module - I should be able to parse line by line
3. Manipulate, Munge, Filter, Aggregate the data based on the requirements
4. Write to JSON
5. Design and build an Optimal Schema
6. Plot graphs based on this Optimal Schema

### Project structure

The folders and files you see in this repositories, is how it is expected to be in projects, which are submitted for Automated Evaluations

	Project
	|
	├── data 			// If project needs any data file, it can be found here/placed here, if data is huge they can be mounted no need put it in your repository
	|
	├── test			//  You Unit test cases, which are executed using mocha, files should end with or suffix at end with 'test.js', these test cases can run before or in parallel to running of the application/program
	|
	├── karma			// Karma based headless UI test cases, must contain relevant conf files (Would be required in Step 2 of Assignment)
	|
	├── output 			// When project is executed (ran), if any output files/data is generated, it has to be saved in this folder. Therefore ensure that you write your files in this folder only.
	|
	├── output-test 	// Any test cases, which actually validate the generated output, these test cases have to be put here, this tests will run only after running the program, which generates the output
	|
	├── scripts
	| 	└── db 			// Any initial data loading DB scripts can be placed in this folder
	|
	├── index.js 			// The main entry point for the project, it need not be index.js if `npm start` in package.json points to correct main file
	|
	├── package.json 		// You can update the metadata - but do not remove, Automated Evaluation system will invoke npm commands, such as `npm start`, `npm test`, which refer to this file
	|
	├── .hobbes   			// Please do not delete - meant for Automated Evaluation
	|
	├── .eslintrc.js 		// Rules for Javascript lint checks, these are common or generic JS rules, project is evaluated against these rule.
	|
	├── .htmlhintrc 		// Rules for HTML Lint rules, project is evaluated against these rule.
	|
	├── .smellsrc.js 			// ESLint based code smell rules, project is evaluated against these rule.
	|
	├── HINTS.md 			// You can provide any hints for the cadet about the project, you can format it in markdown format for convenience
	|
	└── PROBLEM.md  		// Describe about the problem of the assignment/project, you can provide as much as information and clarification you want about the project in this file

> PS: All lint rule files are by default copied during the evaluation process, however if need to be customizing, you should copy from this repo and modify in your project repo


#### To use this as a boilerplate for your new project, you can follow these steps

1. Clone the base boilerplate in your local

	`git clone ssh://git@gitlab-dev.stackroute.in:2222/assignments/base-boilerplate.git` (If you are using the Cloud Based Dev Environment)

2. Remove its remote or original reference

	`git remote rm origin`

3. Add your new repository reference as remote

	`git remote add origin ssh://git@gitlab-dev.stackroute.in:2222/yourusername/your-new-project-repo.git`

4. Commit and Push the project to git

	`git commit -a -m "Initial commit | or place your comments according to your need"`

	`git push -u origin master`

5. Check on the git repo online, if the files have been pushed

### Important instructions for Participants
> - We expect you to write the assignment on your own by following through the guidelines, learning plan, and the practice exercises
> - The code must not be plagirized, the mentors will randomly pick the submissions and may ask you to explain the solution
> - The code must be properly indented, code structure maintained as per the boilerplate and properly commented
> - Follow through the problem statement and stories shared with you

### Further Instructions on Release

*** Release 0.1.0 ***

- Ensure you run `npm install` before you proceed
- Copy the chicago crimes CSV file in the data/ folder
- Run `npm start` to execute the program

**Work in Progress**

## WELCOME!

**This is a Table which can be used to visualise data from Gousto's DynamoDB archiver functions**

This project uses React for the front end and ontop of this the popular library [Ant.Design](https://ant.design)<br />

Local requirements: updated version of Node.js && npm<br />

## Setting it up locally for editing:

Clone the repository<br /> 

### `npm install`

Install's all the various `node_modules`<br />

This will allow the app to be run locally

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Still in development<br />
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run-script build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

This is what will be posted the the S3 bucket<br />

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Notes on the app and Ant.Design

The app is built using a component from the [Ant.Design](https://ant.design) library (namely the Table). There are two key reasons for this:<br/>
<ol>
<li>[Ant.Design](https://ant.design) is very good at doing the heavy lifiting when it comes to filtering, sorting and pagenating the table</li> 
<li>It makes it very easy to add/remove functionality</li> 
</ol>

Additional components can be found [here](https://ant.design/components/table/)

**Basic guide on adding new column**

<ol>
<li>Run through the above</li> 
<li>Copy and paste the code below and insert it in the columns section</li> 
{
				title     : "View Object in AWS",
				key       : "s3_location_link",
				dataIndex : "s3_location_link",
				render    : (text, record, key, dataIndex) => (
					<span>
						<a href={record.s3_location_link} rel="noopener noreferrer" target="_blank ">
							View Object
						</a>
					</span>
				)
			}
  <li> Test</li>
            
</ol>



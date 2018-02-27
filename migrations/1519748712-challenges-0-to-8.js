const filename = `${__filename.slice(__dirname.length + 1, -3)}`;
const ChallengeModel = require('../models/challenge');
const UserModel = require('../models/user');

const addOrUpdatehallenge = async (data) => {
    const user = await UserModel.findOne({ username: 'codecorgi' });
    data._user = user._id;

    const query = { number: data.number };
    return ChallengeModel.findOne(query).then(doc => {
        if (doc) {
            return ChallengeModel.update(query, data);
        }
        const challenge = new ChallengeModel(data);
        return challenge.save();
    });
}

const challenges = [
    {
        "title": "Create an Image Carrousel for the Homepage",
        "short_title": "add-carousel-to-homepage",
        "visible": true,
        "number": "0",
        "technical_notes": "Image carousels are very common on the internet. You should be able to find a big amount of SO answers, and libraries to solve this, there's no preference for a solution as long as is working.",
        "procedure": "To solve this, the following is recommended:\n\nGithub account, and basic git skills.\n\nJavaScript proficiency.",
        "coding": "To create your answer follow this steps:\n\nFork the repo to your account, or download the zip file\n\n* Solve the ticket, adding the code necesary in index.html and app.js\n\n* Commit your code\n\n* Push your changes\n\n* [Publish your version in Github Pages](https://pages.github.com/) (optional)",
        "source": [{
            "name": "Github",
            "url": "https://github.com/code-corgi/challenge-0-carousel"
        },
        {
            "name": "Zip",
            "url": "https://github.com/code-corgi/challenge-0-carousel/archive/master.zip"
        }
        ],
        "tags": [
            "javascript",
            "HTML",
            "CSS"
        ],
        "body": {
            "description": "Our new website about the lore of the Ainulindalë has a nice cover image, but the client has decided that the images on the frontpage should rotate.\n\nYou can find all the images in the repo, in the `images` folder, with names `hero-image-x`, they should appear in the order they're numbered.",
            "short_description": "Our new website about the lore of the Ainulindalë has a nice cover image, but the client has decided that the images on the frontpage should rotate.",
            "extra_points": "Create a solution using Vanilla JS and not relying in JQuery or other libraries. The solution can use an arbitrary number of images, and is not hardcoded to work with the 4 present.",
            "attachments": []
        },
        "head": {
            "owner": "Glaurung",
            "difficulty": "2",
            "priority": "Low",
            "challenge_type": "Feature",
            "date_created": "2017-02-04T00:00:00.000Z",
            "resolution": "Unresolved",
            "status": "New"
        }
    },
    {
        "title": "Create a Functional Prototype From a Design",
        "short_title": "functional-mockup",
        "visible": true,
        "number": "1",
        "technical_notes": "There are no particular framework or library you'll need to use, is preferable if you start from scratch, but feel free to use any tool you're familiar with, including SASS, Less, Bootstrap, or whichever is your favorite. Lite code is preferred, is a simple design that might evolve, so don't go for overkill solutions.",
        "procedure": "To solve this, the following is recommended:\n\nGithub account, and basic git skills.\n\nBasic HTML, JS and CSS skills.",
        "coding": "To create your answer follow this steps:\n\nFork the repo to your account, or download the zip file\n\n* Solve the ticket, adding the code necesary in index.html and creating any additional files you need\n\n* Commit your code\n\n* Push your changes\n\n* [Publish your version in Github Pages](https://pages.github.com/) (optional)",
        "source": [{
            "name": "Github",
            "url": "https://github.com/code-corgi/challenge-1-functional-prototype"
        },
        {
            "name": "Zip",
            "url": "https://github.com/code-corgi/challenge-1-functional-prototype/archive/master.zip"
        }
        ],
        "tags": [
            "HTML",
            "CSS",
        ],
        "body": {
            "description": "The designers just gave us the new design for the magazine, we need you to take this image files into working code. Checkout the code and attachments, and create a code that looks the most similar possible. Checkout the source folder for the designs in PDF, Sketch or PNG.",
            "short_description": "The designers just gave us the new design for the magazine, we need you to take this image files into working code.",
            "extra_points": "Create all your code from scratch. Serve a single CSS file.",
            "attachments": [
                {
                    "name": "Desktop Layout",
                    "url": 'https://github.com/code-corgi/challenge-1-functional-prototype/blob/master/source/desktop.png?raw=true',
                },
                {
                    "name": "Mobile Layout",
                    "url": 'https://github.com/code-corgi/challenge-1-functional-prototype/blob/master/source/mobile.png?raw=true',
                },
            ]
        },
        "head": {
            "owner": "Thorog",
            "difficulty": "1",
            "priority": "Critical",
            "challenge_type": "Feature",
            "date_created": "2017-02-08T00:00:00.000Z",
            "resolution": "Unresolved",
            "status": "New"
        }
    },
    {
        "title": "Present List of Repos From a Candidate",
        "short_title": "list-repos",
        "visible": true,
        "number": "2",
        "technical_notes": "There are no particular framework or library you'll need to use, is preferable if you start from scratch, but feel free to use any tool you're familiar with, Modern APIs or tools are preferable, if a custom solution is built, make sure to add documentation explaining how it works. Lite code is preferred, is a simple design that might evolve, so don't go for overkill solutions.",
        "procedure": "To solve this, the following is recommended:\n\nGithub account, and basic git skills.\n\nBasic Javascript, HTML and CSS skills.",
        "coding": "To create your answer follow this steps:\n\nFork the repo to your account, or download the zip file\n\n* Solve the ticket, adding the code necesary in index.html, app.js and creating any additional files you need\n\n* Commit your code\n\n* Push your changes\n\n* [Publish your version in Github Pages](https://pages.github.com/) (optional)",
        "source": [{
            "name": "Github",
            "url": "https://github.com/code-corgi/challenge-2-list-repos"
        },
        {
            "name": "Zip",
            "url": "https://github.com/code-corgi/challenge-2-list-repos/archive/master.zip"
        }
        ],
        "tags": [
            "HTML",
            "CSS",
            "JAVASCRIPT",
            "API",
        ],
        "body": {
            "description": "We'd like to have a tool that easily lets us see what code has an applicant worked on. Using the Github API, retrieve all the repos for an username and display them in a way that highlights which are more significant given your criteria. This particular endpoint requires no authentication, you can make GET requests to it, like [this](https://api.github.com/users/dvidsilva/repos). See their documentation [here](https://developer.github.com/v3/repos/#list-your-repositories). ",
            "short_description": "We'd like to have a tool that easily lets us see what code has an applicant worked on.",
            "extra_points": "Create all your code from scratch. Use the fetch API, promises and the new array methods. Good coding standards are always preferred, single responsibility functions, consistent indentation, etc.",
            "attachments": [],
        },
        "head": {
            "owner": "Drekar",
            "difficulty": "3",
            "priority": "Critical",
            "challenge_type": "Feature",
            "date_created": "2017-03-04T00:00:00.000Z",
            "resolution": "Unresolved",
            "status": "New"
        }
    },
    {
        "title": "Create a Dynamic Image Gallery",
        "short_title": "image-gallery",
        "visible": true,
        "number": "3",
        "technical_notes": "There are no particular framework or library you'll need to use, is preferable if you start from scratch, but feel free to use any tool you're familiar with, including SASS, Less, Bootstrap, or whichever is your favorite. Lite code is preferred, is a simple design that might evolve, so don't go for overkill solutions.",
        "procedure": "To solve this, the following is recommended:\n\nGithub account, and basic git skills.\n\nBasic HTML, CSS and JS skills.",
        "coding": "To create your answer follow this steps:\n\nFork the repo to your account, or download the zip file\n\n* Solve the ticket, adding the code necesary in index.html and creating any additional files you need\n\n* Commit your code\n\n* Push your changes\n\n* [Publish your version in Github Pages](https://pages.github.com/) (optional)",
        "source": [{
            "name": "Github",
            "url": "https://github.com/code-corgi/challenge-3-img-gallery"
        },
        {
            "name": "Zip",
            "url": "https://github.com/code-corgi/challenge-3-img-gallery/archive/master.zip"
        }
        ],
        "tags": [
            "HTML",
            "CSS",
            "JAVASCRIPT",
            "API",
        ],
        "body": {
            "description": "Create a web page that shows a grid of photo thumbnails; or a photo feed you can use any public API that returns photos. You can get photos from any public API that has them, some examples are: [Imgur](https://api.imgur.com/endpoints/gallery) [Flickr](https://www.flickr.com/services/api/flickr.photosets.getPhotos.html) [Google Image Search](https://developers.google.com/custom-search/json-api/v1/overview). Once you pulled the images, replace the HTML marked with the data to display them as in a gallery.",
            "short_description": "Create a web page that shows a grid of photo thumbnails; or a photo feed you can use any public API that returns photos.",
            "extra_points": "Create your code from scratch. Use the fetch API, promises and modern array functions. When using the imgur API, be careful because it returns a single image or an album sometimes.",
            "attachments": []
        },
        "head": {
            "owner": "Glaurung",
            "difficulty": "3",
            "priority": "Critical",
            "challenge_type": "Feature",
            "date_created": "2017-03-18T00:00:00.000Z",
            "resolution": "Unresolved",
            "status": "New"
        }
    },
    {
        "title": "CSS FizzBuzz",
        "short_title": "css-fizz-buzz",
        "visible": true,
        "number": "4",
        "technical_notes": "There are no particular framework or library you'll need to use, is preferable if you start from scratch. The exercise should be very simple so don't overcomplicate or spend too much time on it.",
        "procedure": "To solve this, the following is recommended:\n\nGithub account, and basic git skills.\n\nBasic CSS skills, nth-selector.",
        "coding": "To create your answer follow this steps:\n\nFork the repo to your account, or download the zip file\n\n* Solve the ticket, adding the code necesary in index.html and app.css\n\n* Commit your code\n\n* Push your changes\n\n* [Publish your version in Github Pages](https://pages.github.com/) (optional)",
        "source": [{
            "name": "Github",
            "url": "https://github.com/code-corgi/challenge-4-css-fizz-buzz"
        },
        {
            "name": "Zip",
            "url": "https://github.com/code-corgi/challenge-4-css-fizz-buzz/archive/master.zip"
        }
        ],
        "tags": [
            "CSS",
        ],
        "body": {
            "description": "Use CSS to change the colors of the rows on the table so it's easier to read.\n\nFor a row which position is a multiple of 3 make the background of the row this color: #6276A3, for every 5th row make the background this color: #8AA6E5, and for rows that are a multiple of both change the background color to #262E40.\n\nYou can add your code on the css/app.css file.",
            "short_description": "Use CSS to change the colors of the rows on the table so it's easier to read.",
            "extra_points": "Serve a single or none CSS file.",
            "attachments": []
        },
        "head": {
            "owner": "Scatha the Worm",
            "difficulty": "1",
            "priority": "Low",
            "challenge_type": "Improvement",
            "date_created": "2017-04-16T00:00:00.000Z",
            "resolution": "Unresolved",
            "status": "New"
        }
    },
    {
        "title": "CSV to Table",
        "short_title": "csv-to-table",
        "visible": true,
        "number": "5",
        "technical_notes": "There are no particular framework or library you'll need to use, is preferable if you start from scratch. The exercise should be very simple if you're already familiar with JS, so don't overcomplicate or spend too much time on it.",
        "procedure": "To solve this, the following is recommended:\n\nGithub account, and basic git skills.\n\nBasicish JS skills, DOM manipulation.",
        "coding": "To create your answer follow this steps:\n\nFork the repo to your account, or download the zip file\n\n* Solve the ticket, adding the code necesary in index.html and app.js\n\n* Commit your code\n\n* Push your changes\n\n* [Publish your version in Github Pages](https://pages.github.com/) (optional)",
        "source": [{
            "name": "Github",
            "url": "https://github.com/code-corgi/5-csv-to-table"
        },
        {
            "name": "Zip",
            "url": "https://github.com/code-corgi/5-csv-to-table/archive/master.zip"
        }
        ],
        "tags": [
            "CSS",
        ],
        "body": {
            "description": "Request a CSV file and display the data on an HTML table.\n\nThe CSV file data/customers.csv will return customer information in this order:\n\n`ID, First Name, Last Name, Email, Job Title, City`.\n\nFor every row in the CSV and column add that data to the table.",
            "short_description": "Request a CSV file and display the data on an HTML table.",
            "extra_points": "Serve a single or none CSS file.",
            "attachments": []
        },
        "head": {
            "owner": "Scatha the Worm",
            "difficulty": "2",
            "priority": "Critical",
            "challenge_type": "Feature",
            "date_created": "2017-04-27T00:00:00.000Z",
            "resolution": "Unresolved",
            "status": "New"
        }
    },





    {
        "title": "Turn your portfolio into a progressive web app",
        "short_title": "progressive-web-app-portfolio",
        "visible": true,
        "number": "7",
        "technical_notes": "Check out this introduction to PWA by Google [here](https://developers.google.com/web/updates/2015/12/getting-started-pwa).\n\nLearn about the\n[Service workers](https://developers.google.com/web/fundamentals/primers/service-workers/).\n\nLearn about [Debugging Service workers](https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers/)",
        "procedure": "To solve this, the following is recommended:\n\nGithub account, and basic git skills.\n\nJavaScript proficiency, familiarity with promises, fetch, cache and the basis of the event loop.",
        "coding": "To create your answer follow this steps:\n\nFork the repo to your account, or download the zip file\n\n* Solve the ticket\n\n* Commit your code\n\n* Push your changes\n\n* [Publish your version in Github Pages](https://pages.github.com/) (optional)\n\n* Submit your response",
        "source": [{
            "name": "Github",
            "url": "https://github.com/code-corgi/startbootstrap-freelancer"
        },
        {
            "name": "Zip",
            "url": "https://github.com/code-corgi/startbootstrap-freelancer/archive/master.zip"
        }
        ],
        "tags": [
            "javascript",
            "service workers",
            "PWA"
        ],
        "body": {
            "description": "Your portafolio page is a great place to brag about your skills and experiment with new technologies. Add a service worker to your application so that it caches all its content on the device and can be visited even if the device is offline. This will severely impress the people reviewing your job applications.",
            "short_description": "Your portafolio page is a great place to brag about your skills and experiment with new technologies.",
            "extra_points": "Add a manifest to include an icon and the ability to add to the homepage.\n\nChange the images and information on the portfolio template to include your actual work experience, some images of your work, your name, and contact information.",
            "attachments": []
        },
        "head": {
            "owner": "Ancalagon the Black",
            "difficulty": "4",
            "priority": "Critical",
            "challenge_type": "Feature",
            "date_created": "2018-02-19T00:00:00.000Z",
            "resolution": "Unresolved",
            "status": "New"
        }
    },
];

const up = async () => {
    console.log(`Running up for ${filename}`);
    challenges.forEach(async (c) => {
        await addOrUpdatehallenge(c);
    });
    console.log(`Finishing up for ${filename}`);
}

const down = () => {
    return;
}

module.exports = {
    up,
    down,
}

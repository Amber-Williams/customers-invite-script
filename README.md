# 1. Technical problem

## Set Up

1. Clone the repository
2. Make sure to have npm and node installed on your system - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm (I used node v12.4.0 and npm v6.9.0)
3. In the root of the directory run `npm install` to install the necessary package dependencies
4. Run `npm run create` to create the customer invite list
5. To run tests run `npm run test`

## About the script

I created this script using Node and tested with Jest. I tried to use file and code structures that would scale well and added readability to the project. Throughout the build I kept an inheritance programming design pattern in mind, though when the need for testing arose it became evident that a constuctor pattern would be better to use namely for the `CustomerInvites` component. Designing it as such, leaves the doors open to easily add factory construtors that could create invites for different locations for example that would contain their own unique state.

Lastly, you may notice there is two distance calculations on the distance object for each customer in the `customer-invite.json`. The reason for this is I wanted to show that there are two forumulas for calculating distance on the globe. I would recommend using the other more readable Haversine formula because this computation has only a slight drawback when calculating distances where milimeters in sizing matters. Verses Vincentry's computationally intensive formula which is less performant when considering compute usage.

#### Input & Output file names

Input: `customers.json`

Output: `customers-invite.json`

# 2. Proudest Achievement

My proudest achievement can be found in the `achievement.md` file at the root of this repository. 
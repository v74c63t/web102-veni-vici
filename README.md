# Web Development Project 4 - _Veni Vici_

Submitted by: **Vanessa Tang**

This web app: **fetches information for the [Cat API](https://thecatapi.com) and displays it to the user. Once the discover button is clicked on, it randomly fetches information on one cat and displays its picture and a couple of its attributes. Users can click one of its attributes to place said attribute in the ban list so future requests will not display any cats with said attribute. Users, however, can also remove any attributes from the ban list and cats with those attributes can be fetched and displayed on the page again. Multiple attributes can be placed in the ban list, which may in turn cause some delay between fetching information from the API because of the preprocessing required to make sure cats with certain attributes are not displayed to the user. Lastly, there is history section in which users can view what cats they have seen so far.**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

-   [x] **Clicking a button creates a new API fetch request and displays at least three attributes from the returned JSON data**
-   [x] **Only one item/API call is viewable at a time**
-   [x] **API calls appear random to the user**
-   [x] **At least one image is displayed per API call**
-   [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
-   [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**

The following **optional** features are implemented:

-   [x] Multiple types of attributes can be added to the ban list
-   [x] Users can see a stored history of their previously viewed items from their session

The following **additional** features are implemented:

-   [x] Items can be removed from the ban list

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='walkthrough.gif' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with [Kap](https://getkap.co/)

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

I originally planned on using the Dog API provided in the resources, but there was less information returned in the response than I expected so I switched over to the Cat API. At first, I encountered some problems with calling the API and getting a response, but it ended up being a problem with the way I defined my environment variables. Later on, I had some issues with figuring out how to structure everything such as the ban list and how to separate everything into components so I had to make many changes throughout the entire process.

## License

    Copyright [2024] [Vanessa Tang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

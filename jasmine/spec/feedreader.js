/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    /* A test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* A test that make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URL defined & the URL is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed 
         * in the allFeeds object to ensures it has a name defined
         * and that the name is not empty.
        */
        it('name defined & the name is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* A test suite named "The menu" */
    describe('The menu', function () {

        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('the menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('the menu changes visibility', function() {
            /* A test for the menu element if it is hidden by default */
            expect($('body').hasClass('menu-hidden')).toBe(true);

            /* A test for the menu element if it is display when clicked */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            /* A test for the menu element if it is hide when clicked again */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * 
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('the loadFeed function has been loaded', function(done) {
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });

    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         *
         * loadFeed() is asynchronous.
         */

        let firstFeed, secondFeed;

        beforeEach(function(done) {
            /* Load the first feed */
            loadFeed(0 ,function() {
              /* Save the first feed content */
              firstFeed = $('.feed').html();
              /* Load the second feed */
              loadFeed(1, function() {
                /* Save the second feed content*/
                secondFeed = $('.feed').html();
                done();
              });
            });
        });

        /* Test to ensure that the two feeds are not equals */
        it('new feed is loaded by the loadFeed function that the content actually changes' , function(done) {
            expect(firstFeed != secondFeed).toBe(true);
            done();
        });

    });
}());

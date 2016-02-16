/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); // Test to verify variable is defined.
            expect(allFeeds.length).not.toBe(0); // Test to verify length is not 0.
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('has a URL and the URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); // Test to verify feed url is defined.
                expect(feed.url.length).not.toBe(0); // Test to verify url is not empty by ensuring length is not 0, thus empty.
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has a name defined and each name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined(); // Test to verify the feed name is defined.
                expect(feed.name.length).not.toBe(0); // Test to verify name is not empty by ensuring length is not 0, thus empty.
            });
        });
    });


    /* Test suite to verify menu functions as intended */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true); // For menu to be hidden, the container will have a 'menu-hidden' class.
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('changes visibility when the menu icon is clicked (to hide and show the menu)', function() {
            $('.menu-icon-link').trigger('click'); // Trigger the click event
            expect($('body').hasClass('menu-hidden')).toBe(false); // Test that the menu-hidden class to be removed from the DOM.
            $('.menu-icon-link').trigger('click'); // Trigger the click event again.
            expect($('body').hasClass('menu-hidden')).toBe(true); // Test that the menu-hidden class to be added back to the DOM.
        });
    });

    /* Test suite to verify feeds loading on app run. These are all asynchronous operations. */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) { // This is the asynchronous test. It loads feed of 0 and calls the done() function on callback.
            loadFeed(0, done);
        });

        it('there is at least a single .entry element within the .feed container', function(done) {
            var numEntries = $('.feed .entry').length; // Variable assignment for accumulative number of .entry children under each .feed
            expect(numEntries).toBeGreaterThan(0); // Test to verify the total to be greater than 0.
            done();
        });

    });

    /* Test suite to verify new feeds are loaded. */

    describe('New Feed Selection', function() {
        var oldFeed,
            newFeed;

        /*  Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) { // This is the asynchronous test. It loads feed of 0 and calls the done() function on callback.
            $('.feed').empty(); // Empty out all previous feeds to ensure clean testing.
            loadFeed(0, function() { // This loads feed 0.  Upon completion, it performs this anonymous function.
                oldFeed = $('.feed').html(); // Variable assignment for feed 0 html.
                done();
            });
        });

        it('when a new feed is loaded, the content actually changes', function(done) {
            loadFeed(1, function() { // CB function that loads feed 1.
                newFeed = $('.feed').html(); // Variable assignment for feed 1 html.
                expect(oldFeed).not.toEqual(newFeed); // Test that the html of feed 0 does not equal feed 1, thus validating they are different.
                done();
            });
        });
    });
}());
describe('Check whether SVG has been created for the Bar Graph', function() {
    var svg = document.getElementsByTagName("svg");
    it('DOM should have the SVG', function() {
        expect(svg.length).to.equal(2);
    });

    it('svg have rectangles for the bar graph ', function() {
        expect(document.getElementsByTagName("rect")).to.not.be.null;;
    });

});

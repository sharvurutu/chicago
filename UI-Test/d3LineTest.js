describe('Check whether SVG has been created for the Line Graph', function() {
    var svg = document.getElementsByTagName("svg");
    it('DOM should have the SVG', function() {
        expect(svg.length).to.equal(2);
    });

    it('the SVG have the lines for line graph ', function() {
        expect(document.getElementsByTagName("line")).to.not.be.null;;
    });
});

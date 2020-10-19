const expect = require('chai').expect;
const HtmlDiffLibrary = require('../src/diffr.js');
const HtmlDiff = new HtmlDiffLibrary();

describe('htmldiffer', function() {
	describe('htmldiff', function() {
		it('should return unchanged text when both inputs are the same', function() {
			const response = HtmlDiff.htmldiff('input text', 'input text');
			expect(response).to.equal('input text');			
		});

		it('should mark new letter added', function() {
			const response = HtmlDiff.htmldiff('input', 'input 2');
			expect(response).to.equal('input<ins> 2</ins>');			
		});

		it('should mark letter deleted', function() {
			const response = HtmlDiff.htmldiff('input 2', 'input');
			expect(response).to.equal('input<del> 2</del>');			
		});

		it('should support img tags insertion', function() {
			const oldv = 'a b c'
			const newv = 'a b <img src="some_url" /> c'
			diff = HtmlDiff.htmldiff(oldv, newv);
			expect(diff).to.equal("a b <ins><img src=\"some_url\" /> </ins>c");
		});

		it('should support img tags deletion', function() {
			const oldv = 'a b c'
			const newv = 'a b <img src="some_url" /> c'
			diff = HtmlDiff.htmldiff(newv, oldv);
			expect(diff).to.equal("a b <del><img src=\"some_url\" /> </del>c");
		});
	});
});

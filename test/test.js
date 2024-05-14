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

	describe('textdiff', function() {
		it('should return unchanged text when both inputs are the same', function() {
			const response = HtmlDiff.textdiff('input text', 'input text');

			expect(response).to.equal(' input  text\n');
		});

		it('should mark new text added', function() {
			const response = HtmlDiff.textdiff('example', 'example text');

			expect(response).to.equal(' example <ins>text\n</ins>');
		});

		it('should mark text deleted', function() {
			const response = HtmlDiff.textdiff('example text', 'example');

			expect(response).to.equal(' example\n<del>text\n</del>');
		});

		it('should identify word changes', function() {
			const response = HtmlDiff.textdiff('old word', 'new word');

			expect(response).to.equal('<del>old </del><ins>new </ins> word\n');
		});

		it('should support multiple changes', function() {
			const response = HtmlDiff.textdiff('first third', 'first second third');

			expect(response).to.equal(' first <ins>second </ins> third\n');
		});

		it('should respect boundary changes', function() {
			const response = HtmlDiff.textdiff('start and end', 'start middle and end');

			expect(response).to.equal(' start <ins>middle </ins> and  end\n');
		});

		it('should handle the word "constructor"', function () {
			const response = HtmlDiff.textdiff('constructor', 'constructor');

			expect(response).to.equal(' constructor\n');
		});
	});
});

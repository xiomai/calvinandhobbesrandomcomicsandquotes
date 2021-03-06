import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CalvinAndHobbes extends EventEmitter {

	constructor() {
		super()
		this.imgSrc = {
		url: [],
		error: false,
		fetching: true
	}
	/**
	 * Random quotes from https://github.com/Siilwyn/calvin-and-hobbes-quotes.
	 */
	this.quotes = [
		"It’s a magical world, Hobbes, ol’ buddy... Let’s go exploring!",
		"Sometimes I think the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.",
		"People think it must be fun to be a super genius, but they don’t realize how hard it is to put up with all the idiots in the world.",
		"I like maxims that don’t encourage behavior modification.",
		"If people could put rainbows in zoos, they’d do it.",
		"It’s hard to be religious when certain people are never incinerated by bolts of lightning.",
		"Why waste time learning, when ignorance is instantaneous?",
		"In my opinion, we don’t devote nearly enough scientific research to finding a cure for jerks.",
		"I pray for the strength to change what I can, the inability to accept what I can’t, and the incapacity to tell the difference.",
		"You know, Hobbes, some days even my lucky rocket ship underpants don’t help.",
		"Happiness isn’t good enough for me! I demand euphoria!",
		"I think night time is dark so you can imagine your fears with less distraction.",
		"Van Gogh would’ve sold more than one painting if he’d put tigers in them.",
		"The world bores you when you’re cool.",
		"Life is full of surprises, but never when you need one.",
		"If people sat outside and looked at the stars each night, I’ll bet they’d live a lot differently.",
		"Getting an inch of snow is like winning 10 cents in the lottery.",
		"So the secret to good self-esteem is to lower your expectations to the point where they’re already met?",
		"I don’t know which is worse: that everyone has his price, or that the price is always so low.",
		"The best presents don’t come in boxes.",
		"If you can’t control your peanut butter, you can’t expect to control your life.",
		"Things are never quite as scary when you’ve got a best friend.",
		"There’s never enough time to do all the nothing you want."
		]

	this.lastQuote = ''
  
	}

	getImgSrc() {
		return this.imgSrc;
	}

	getQuote() {
		const quotes = this.quotes
		const quote = quotes[Math.floor(Math.random() * quotes.length)]
		if (this.imgSrc.fetching){
			this.lastQuote = quote
			return quote
		} else {
			return this.lastQuote
		}
	}

   handleActions(action) {
		switch (action.type) {
			case "FETCHING_IMAGE_SUCCESS": {
				this.imgSrc.url = action.payload
				this.imgSrc.error = false
				this.imgSrc.fetching = false
				this.emit("change")
				break
			}
				case "FETCHING_IMAGE_ERROR": {
				this.imgSrc.error = true
				this.imgSrc.fetching = false
				this.emit("change")        
				break
			}
			case "FETCHING_IMAGE": {
				this.imgSrc.error = false
				this.imgSrc.fetching = true
				this.emit("change")        
				break
			}
		}
   }
   
}

const calvinAndHobbes = new CalvinAndHobbes
dispatcher.register(calvinAndHobbes.handleActions.bind(calvinAndHobbes))

export default calvinAndHobbes

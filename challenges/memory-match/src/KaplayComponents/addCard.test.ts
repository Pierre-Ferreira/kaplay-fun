import { addCard } from './addCard';

test('addCard adds a card correctly', () => {
	const initialCards = [];
	const newCard = { id: 1, name: 'Card 1' };
	const updatedCards = addCard(initialCards, newCard);
	expect(updatedCards).toEqual([newCard]);
});

test('addCard does not add duplicate cards', () => {
	const initialCards = [{ id: 1, name: 'Card 1' }];
	const newCard = { id: 1, name: 'Card 1' };
	const updatedCards = addCard(initialCards, newCard);
	expect(updatedCards).toEqual(initialCards);
});
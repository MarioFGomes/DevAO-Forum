import { Slug } from './slug';

test('it should be able to create a new slug from text', () => {
	const slug=Slug.CreateFromText('An example Text');
	expect(slug.value).toEqual('an-example-text');
});
import type { MetaFunction, LinksFunction } from 'remix';
import indexStyles from '~/styles/index.css';
import { Link } from 'remix';

export let meta: MetaFunction = () => {
  return {
    title: 'Home of JAW - Jonas Amsen-Wallander',
    description: 'A place where I can play around.',
  };
};

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: indexStyles }];
};

export default function Index() {
  return (
    <div className="container">
      <h1>Well hello!</h1>
      <p>How peculiar that you found your way here.</p>
      <p>
        This is a place I use to learn more about web development, and some
        [sources might be added at some point] say that the best way to learn is
        to teach. With that in mind you could possibly find something of
        interest in the <Link to="/blog">blog</Link> section.
      </p>
      <p>
        If you're curious <Link to="/about">about me</Link>, guess where you
        could look.
      </p>
      <p>
        As if that's not enough, I try to maintain my focus by stating it in the{' '}
        <Link to="/now">now</Link>-section of my page.
      </p>
    </div>
  );
}

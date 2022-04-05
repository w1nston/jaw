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
      <p>
        The geese were having a great relaxed time and had no major answers they
        wished to know the questions to. Ford Prefect was also heading toward a
        beer moment. At night it was at its most spectacular, floodlit by the
        teams of television crews who covered it continuously as it continuously
        did nothing. Trin Tragula—for that was his name—was a dreamer, a
        thinker, a speculative philosopher or, as his wife would have it, an
        idiot. Nothing couldn't be, and if it shouldn't be, then it generally
        was.
      </p>
      <p>
        He was wrong to think he could now forget that the big, hard, oily,
        dirty, rainbow-hung Earth on which he lived was a microscopic dot on a
        microscopic dot lost in the unimaginable infinity of the Universe. He
        drove on, humming, being wrong about all these things. Landscape
        gardening, it's the future. Killing people over cheese, did you ever
        hear anything more ludicrous? He felt a spasm of excitement because he
        knew instinctively who it was, or at least knew who it was he wanted it
        to be, and once you know what it is you want to be true, instinct is a
        very useful device for enabling you to know that it is. Number Two's
        eyes narrowed and became what are known in the Shouting and Killing
        People trade as cold slits, the idea presumably being to give your
        opponent the impression that you have lost your glasses or are having
        difficulty keeping awake. Why this is frightening is an, as yet,
        unresolved problem.
      </p>
      <p>
        Anything that happens, happens. There is a feeling which persists in
        England that making a sandwich interesting, attractive, or in any way
        pleasant to eat is something sinful that only foreigners do. In so far
        as it is possible for a green blur to arch its eyebrows disdainfully,
        this is what the green blur now did. He learned to communicate with
        birds and discovered that their conversation was fantastically boring.
        It was all to do with wind speed, wingspans, power-to-weight ratios and
        a fair bit about berries. The previous sentence makes sense. That is not
        the problem.
      </p>
    </div>
  );
}

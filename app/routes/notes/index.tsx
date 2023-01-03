import type { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import type { NoteMetadata } from '~/types/notes';
import notesStylesUrl from '~/styles/notes.css';
import { getNotes } from '~/features/notes/getNotes.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: notesStylesUrl },
];

export const loader: LoaderFunction = async () => {
  return await getNotes();
};

type NoteLinkProps = {
  path: string;
  title: string;
  abstract: string;
  tags: string[];
};

function NoteLink({ path, title, abstract, tags }: NoteLinkProps) {
  return (
    <Link to={path}>
      <h2 className="noteLink__title">{title}</h2>
      <hr className="noteLink__divider" />
      <p className="noteLink__abstract">{abstract}</p>
      <div className="noteLink__tagContainer">
        {tags.map((tag) => (
          <span className="noteLink__tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function Notes() {
  let notes = useLoaderData<NoteMetadata[]>();

  if (notes.length < 1) {
    return (
      <div>
        <h1>Notes</h1>
        <p>No notes are good notes... ?</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteLink
              tags={note.tags}
              abstract={note.abstract}
              path={note.id}
              title={note.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

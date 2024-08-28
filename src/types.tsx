export type NoteType = {
  id: string;
  title: string;
  color: string;
  content: string;
  date: string;
  archived: boolean;
};

export type handleaddnote = (
  title: string,
  color: string,
  content: string,
  archived: boolean
) => void;

export type handleeditnote = (
  id: string,
  title: string,
  color: string,
  content: string,
  archived: boolean
) => void;

export type handledeletenote = (id: string) => void;

export type handlesearchtype = (text: string) => void;

export type searchtype = {
  title: string;
  content: string;
};

export type NoteType = {
  id: string;
  title: string;
  color: string;
  content: string;
  date: string;
};

export type handleaddnote = (
  title: string,
  color: string,
  content: string
) => void;

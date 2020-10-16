import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';

export const NoteList = () => {
  return (
    <div className="notelist">
      <List aria-label="Lista de notas">
        <ListItem button className="notelist-active">
          <ListItemText primary="Nota sobre curso de flutter avanzado con patron bloc con angular mongo react express" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso" />
          <div className="notelist__date">
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Nota sobre curso de flutt" />
          <div className="notelist__date">
            <AttachFile />
            <p>12 Oct 2020</p>
          </div>
        </ListItem>
      </List>
    </div>
  );
};

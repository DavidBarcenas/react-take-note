import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Folder } from '@material-ui/icons';

export const CategorySidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__btn">
        <Button>Crear nota</Button>
      </div>
      <div className="sidebar__folders">
        <List component="nav" aria-label="main folders">
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Capacitaciones" />
          </ListItem>
          <ListItem button className="folder-active">
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Ejercicios" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Pruebas técnicas de react y angular" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Liderazgo" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Negocios" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Capacitaciones" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Ejercicios" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Pruebas técnicas" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Liderazgo" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Negocios" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Capacitaciones" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Ejercicios" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Pruebas técnicas" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Liderazgo" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Negocios" />
          </ListItem>
        </List>
      </div>
    </aside>
  );
};

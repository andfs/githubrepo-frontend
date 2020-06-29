import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import UnfavoriteIcon from "@material-ui/icons/FavoriteBorder";
import RepoOwner from "../model/RepoOwner";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Repo from "../model/Repo";

const options: MUIDataTableOptions = {
  selectableRows: "none",
};

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          paddingLeft: "20px !important",
          fontSize: "medium !important",
        },
      },
    } as any,
  });

const CustomTable: React.FC<{ repos: Array<Repo>; toFavorite: (index: number) => void }> = ({ repos, toFavorite }) => {
  const columns: any = [
    {
      name: "full_name",
      label: "Nome",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "html_url",
      label: "URL",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "language",
      label: "Linguagem",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "owner",
      label: "Proprietário",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: RepoOwner) => {
          return value ? value.login : "";
        },
      },
    },
    {
      name: "isFavorite",
      label: "Favoritar",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex: number) => {
          const repo = repos[dataIndex];
          return (
            <IconButton onClick={() => toFavorite(dataIndex)}>
              {repo.isFavorite && <FavoriteIcon style={{ color: "red" }} />}
              {!repo.isFavorite && <UnfavoriteIcon />}
            </IconButton>
          );
        },
      },
    },
  ];

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable title={"Repositórios"} data={repos} columns={columns} options={options} />
    </MuiThemeProvider>
  );
};

export default CustomTable;

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const EditableTable = ({ rows,onSubmit }) => {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editedRows, setEditedRows] = useState(rows);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchCategory, setSearchCategory] = useState('skill');
  const [newSkill, setNewSkill] = useState({ skill: '', rating: '' });

  const handleEdit = (index) => {
    setEditingRowIndex(index);
  };

  const handleSave = (index) => {
    setEditingRowIndex(null);
  };

  const handleDelete = (index) => {
    const updatedRows = [...editedRows];
    updatedRows.splice(index, 1);
    setEditedRows(updatedRows);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setEditedRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][name] = value;
      return updatedRows;
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleAddSkill = () => {
    const updatedRows = [...editedRows, newSkill];
    setEditedRows(updatedRows);
    setNewSkill({ skill: '', rating: '' });
  };

  const filteredRows = editedRows.filter((row) =>
    row[searchCategory].toString().toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>

      <TextField
        label={`Search by ${searchCategory === 'skill' ? 'Skill Name' : 'Rating'}`}
        variant="outlined"
        size="small"
        sx={{maxWidth : '300'}}
        value={searchKeyword}
        onChange={handleSearchInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: '16px' }}
      />
       <FormControl variant="outlined" style={{ marginBottom: '16px' }}>
        <InputLabel id="search-category-label">Search By</InputLabel>
        <Select
        sx={{maxWidth : '200'}}
          labelId="search-category-label"
          id="search-category"
          value={searchCategory}
          onChange={handleSearchCategoryChange}
          label="Search By"
          size="small"

        >
          <MenuItem value="skill">Skill Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Skill Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={row.skill}>
                <TableCell>
                  {editingRowIndex === index ? (
                    <TextField
                      name="skill"
                      size="small"
                      value={row.skill}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    row.skill
                  )}
                </TableCell>
                <TableCell>
                  {editingRowIndex === index ? (
                    <TextField
                      name="rating"
                      size="small"
                      InputProps={{ inputProps: { min: "1", max: "10", step: "1" } }}
                      value={row.rating}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    row.rating
                  )}
                </TableCell>
                <TableCell>
                  {editingRowIndex === index ? (
                    <Button variant="outlined" onClick={() => handleSave(index)}>
                      Update
                    </Button>
                  ) : (
                    <Box sx={{display:'flex'}}>
                      <Button variant="outlined" onClick={() => handleEdit(index)}>
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(index)}
                        style={{ marginLeft: '8px' }}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {/* Add a row for adding a new skill */}
            <TableRow>
              <TableCell>
                <TextField
                  label="New Skill Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newSkill.skill}
                  onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Rating"
                  variant="outlined"
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: "1", max: "10", step: "1" } }}
                  fullWidth
                  value={newSkill.rating}
                  onChange={(e) => setNewSkill({ ...newSkill, rating: e.target.value })}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={handleAddSkill} disabled={!(newSkill.skill && newSkill.rating)}>
                  Add Skill
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button autoFocus variant="contained" sx={{m:2,float:'right'}}onClick={() => onSubmit(editedRows)}>
            Submit
          </Button>
    </div>
  );
};

export default EditableTable;

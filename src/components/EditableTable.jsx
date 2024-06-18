import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Button, Input } from '@chakra-ui/react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const EditableTable = ({ data, setData }) => {
  const handleInputChange = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.value;
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = Object.keys(data[0]).reduce((acc, key) => ({ ...acc, [key]: '' }), {});
    setData([...data, newRow]);
  };

  const handleRemoveRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            {Object.keys(data[0]).map((key) => (
              <Th key={key}>{key}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {Object.keys(row).map((key) => (
                <Td key={key}>
                  <Input
                    value={row[key]}
                    onChange={(e) => handleInputChange(e, rowIndex, key)}
                  />
                </Td>
              ))}
              <Td>
                <IconButton
                  aria-label="Remove row"
                  icon={<FaTrash />}
                  onClick={() => handleRemoveRow(rowIndex)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button leftIcon={<FaPlus />} onClick={handleAddRow} colorScheme="green" mt={4}>
        Add Row
      </Button>
    </>
  );
};

export default EditableTable;
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Button, Grid, InputAdornment, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { storage } from '../../../configs/fireBaseConfig';
// Adjust the import path accordingly

function FileUploadForm() {
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const onSubmit = async (data:any) => {
    const storageRef = storage.ref();

    for (const file of data.files) {
      const fileRef = storageRef.child(file.name);

      try {
        await fileRef.put(file);
        const downloadUrl = await fileRef.getDownloadURL();
        console.log(`File ${file.name} uploaded. Download URL: ${downloadUrl}`);
      } catch (error:any) {
        console.error(`Error uploading file ${file.name}: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {fields.map((item, index) => (
          <Grid item xs={12} key={item.id}>
            <Controller
              name={`files[${index}]`}
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <IconButton onClick={() => remove(index)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => append({})}
      >
        Add File
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Upload Files
      </Button>
    </form>
  );
}

export default FileUploadForm;

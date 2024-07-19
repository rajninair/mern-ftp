import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchFtpServers = createAsyncThunk('ftpservers/fetchFtpServers', async () => {
  const response = await api.get('/ftpservers');
  
  return response.data;
});

export const addFtpServer = createAsyncThunk('ftpservers/addFtpServer', async (ftpServerData) => {
  console.log("ftpServerData in slice", ftpServerData)
  const response = await api.post('/ftpservers', ftpServerData);
  return response.data;
});

export const updateFtpServer = createAsyncThunk('ftpservers/updateFtpServer', async ({ id, sftpHostName, sftpHostIP, sftpUsername, sftpPassword, sftpPort }) => {
  const response = await api.put(`/ftpservers/${id}`, { sftpHostName, sftpHostIP, sftpUsername, sftpPassword, sftpPort });
  return response.data;
});

export const deleteFtpServer = createAsyncThunk('ftpservers/deleteFtpServer', async (id) => {
  await api.delete(`/ftpservers/${id}`);
  return id;
});

export const ftpserverSlice = createSlice({
  name: 'ftpservers',
  initialState: {
    ftpServers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFtpServers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFtpServers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ftpServers = action.payload;
      })
      .addCase(fetchFtpServers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFtpServer.fulfilled, (state, action) => {
        state.ftpServers.push(action.payload);
      })
      .addCase(updateFtpServer.fulfilled, (state, action) => {
        const updatedFtpServer = action.payload;
        const index = state.ftpServers.findIndex(ftpServer => ftpServer.id === updatedFtpServer.id);
        if (index !== -1) {
          state.ftpServers[index] = updatedFtpServer;
        }
      })
      .addCase(deleteFtpServer.fulfilled, (state, action) => {
        state.ftpServers = state.ftpServers.filter(ftpServer => ftpServer.id !== action.payload);
      });
  },
});

export default ftpserverSlice.reducer;

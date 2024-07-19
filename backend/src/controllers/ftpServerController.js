const prisma = require('../prisma');

const getFtpServers = async (req, res) => {
  try {
    const ftpServers = await prisma.ftpServers.findMany();
    res.json(ftpServers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FTP servers' });
  }
};

const createFtpServer = async (req, res) => {
  const { sftpHostName, sftpHostIP, sftpUsername, sftpPassword, sftpPort } = req.body;
  try {
    const ftpServer = await prisma.ftpServers.create({
      data: {
        sftpHostName,
        sftpHostIP,
        sftpUsername,
        sftpPassword,
        sftpPort,
        createdBy: req.userId,
      },
    });
    res.json(ftpServer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the FTP server' });
  }
};

const updateFtpServer = async (req, res) => {
  const { id } = req.params;
  const { sftpHostName, sftpHostIP, sftpUsername, sftpPassword, sftpPort } = req.body;
  try {
    const ftpServer = await prisma.ftpServers.update({
      where: { id: Number(id) },
      data: {
        sftpHostName,
        sftpHostIP,
        sftpUsername,
        sftpPassword,
        sftpPort,
      },
    });
    res.json(ftpServer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the FTP server' });
  }
};

const deleteFtpServer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ftpServers.delete({ where: { id: Number(id) } });
    res.json({ message: "FTP server deleted" });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the FTP server' });
  }
};

module.exports = { getFtpServers, createFtpServer, updateFtpServer, deleteFtpServer };

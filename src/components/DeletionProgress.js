import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTrash, 
  FaVideo, 
  FaFile, 
  FaCheckCircle,
  FaSpinner,
  FaClock,
  FaExclamationTriangle,
  FaHdd,
  FaMicrochip,
  FaNetworkWired,
  FaArrowRight,
  FaFileAlt,
  FaFilm,
  FaLock,
  FaShieldAlt
} from 'react-icons/fa';

const DeletionProgress = ({ deletion, totalSize, onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [deletedSize, setDeletedSize] = useState(0);
  const logEndRef = useRef(null);

  const generateLogMessage = (type, size, index) => {
    const sizeStr = size >= 1024 ? `${(size/1024).toFixed(2)} GB` : `${size.toFixed(2)} MB`;
    const fileTypes = {
      video: [
        `🎬 Deleting video_${index}.mp4 (${sizeStr}) - Overwriting with random data...`,
        `🎥 Removing film_${index}.avi (${sizeStr}) - Secure erase in progress...`,
        `📹 Purging recording_${index}.mov (${sizeStr}) - DoD standard applied...`,
        `🎞️ Destroying clip_${index}.mkv (${sizeStr}) - 7-pass overwrite...`
      ],
      file: [
        `📄 Deleting document_${index}.pdf (${sizeStr}) - Secure shredding...`,
        `🖼️ Removing image_${index}.jpg (${sizeStr}) - Data destruction...`,
        `📦 Purging archive_${index}.zip (${sizeStr}) - Encryption removed...`,
        `📊 Deleting data_${index}.csv (${sizeStr}) - Zeroing out...`,
        `📝 Removing file_${index}.txt (${sizeStr}) - Secure deletion...`
      ]
    };

    const messages = fileTypes[type] || fileTypes.file;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const systemMessages = [
    '🔄 Optimizing storage structure...',
    '🧹 Clearing secure cache...',
    '⚡ Updating file index...',
    '🔍 Verifying data integrity...',
    '📊 Recalculating storage capacity...',
    '🔒 Securing deleted area...',
    '🗑️ Emptying secure recycle bin...',
    '✨ Compressing remaining data...',
    '🛡️ Applying military-grade erasure...',
    '🔐 Encrypting deletion logs...'
  ];

  useEffect(() => {
    if (deletion) {
      const percentage = Math.min(
        Math.floor((deletion.currentStep / deletion.totalSteps) * 100),
        100
      );
      setProgress(percentage);
      setDeletedSize(deletion.deletedSize || 0);

      const totalHours = deletion.duration || 34;
      const remaining = ((100 - percentage) / 100) * totalHours;
      const speedVariation = Math.random() * 0.3 + 0.85;
      const adjustedRemaining = remaining * speedVariation;
      
      const hours = Math.floor(adjustedRemaining);
      const minutes = Math.floor((adjustedRemaining - hours) * 60);
      setEstimatedTime(
        hours > 0 ? `${hours} hours ${minutes} min` : `${minutes} min`
      );

      if (deletion.currentStep % 2 === 0 && deletion.currentStep < deletion.totalSteps) {
        const isVideo = Math.random() > 0.5;
        const type = isVideo ? 'video' : 'file';
        const size = deletion.allSizes?.[deletion.currentStep] || Math.random() * 500 + 10;
        const index = deletion.currentStep;
        
        let message;
        if (Math.random() > 0.7) {
          message = systemMessages[Math.floor(Math.random() * systemMessages.length)];
        } else {
          message = generateLogMessage(type, size, index);
        }
        
        setLogs(prev => [{
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          message: message,
          type: type,
          size: size,
          id: Date.now() + Math.random()
        }, ...prev].slice(0, 50));
      }

      if (logEndRef.current) {
        logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }

      if (deletion.status === 'completed' || percentage >= 100) {
        const finalMessage = `✅ DELETION COMPLETED! ${deletion.files || 0} files & ${deletion.videos || 0} videos (${formatSize(deletion.totalSize || 0)}) permanently destroyed using military-grade erasure.`;
        setLogs(prev => [{
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          message: finalMessage,
          type: 'success',
          id: Date.now()
        }, ...prev]);

        if (onComplete) {
          setTimeout(() => onComplete(), 1000);
        }
      }
    }
  }, [deletion, onComplete]);

  const formatSize = (mb) => {
    if (!mb) return '0 MB';
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(2)} GB`;
    }
    return `${mb.toFixed(2)} MB`;
  };

  const getStatusIcon = () => {
    if (deletion?.status === 'completed' || progress >= 100) {
      return <FaCheckCircle className="status-icon completed" />;
    } else if (deletion?.status === 'error') {
      return <FaExclamationTriangle className="status-icon error" />;
    } else {
      return <FaSpinner className="status-icon running" />;
    }
  };

  const getLogIcon = (type) => {
    switch(type) {
      case 'video': return <FaFilm className="log-icon-video" />;
      case 'file': return <FaFileAlt className="log-icon-file" />;
      case 'system': return <FaNetworkWired className="log-icon-system" />;
      case 'error': return <FaExclamationTriangle className="log-icon-error" />;
      case 'success': return <FaCheckCircle className="log-icon-success" />;
      default: return <FaFileAlt className="log-icon-file" />;
    }
  };

  const getLogColor = (type) => {
    switch(type) {
      case 'video': return '#ff6b6b';
      case 'file': return '#4ecdc4';
      case 'system': return '#45b7d1';
      case 'error': return '#ff4444';
      case 'success': return '#00ff88';
      default: return '#667eea';
    }
  };

  return (
    <motion.div 
      className="deletion-progress"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="progress-header">
        <div className="progress-status">
          {getStatusIcon()}
          <span className="status-text">
            {progress >= 100 ? '✅ Completed' : 
             deletion?.status === 'error' ? '⚠️ Error' : '🔄 Processing...'}
          </span>
        </div>
        <div className="progress-time">
          <FaClock />
          <span>
            {progress >= 100 
              ? 'Completed!' 
              : `⏱️ ETA ~${estimatedTime}`}
          </span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              background: progress >= 100 
                ? 'linear-gradient(90deg, #00ff88, #00d4ff)' 
                : 'linear-gradient(90deg, #00d4ff, #00ff88)'
            }}
          />
        </div>
        <span className="progress-percentage">{Math.min(progress, 100)}%</span>
      </div>

      <div className="progress-details">
        <div className="detail-grid">
          <div className="detail-item">
            <FaFile className="detail-icon" />
            <div>
              <span className="detail-label">Files Deleted</span>
              <span className="detail-value">{deletion?.filesDeleted || 0}</span>
            </div>
          </div>
          <div className="detail-item">
            <FaVideo className="detail-icon" />
            <div>
              <span className="detail-label">Videos Deleted</span>
              <span className="detail-value">{deletion?.videosDeleted || 0}</span>
            </div>
          </div>
          <div className="detail-item">
            <FaHdd className="detail-icon" />
            <div>
              <span className="detail-label">Total Deleted</span>
              <span className="detail-value">{formatSize(deletedSize)}</span>
            </div>
          </div>
          <div className="detail-item">
            <FaMicrochip className="detail-icon" />
            <div>
              <span className="detail-label">Speed</span>
              <span className="detail-value">{deletion?.speed ? (deletion.speed * 1000).toFixed(2) : '0.00'} KB/s</span>
            </div>
          </div>
        </div>

        {deletion?.currentFileSize > 0 && deletion.status === 'running' && (
          <div className="current-file">
            <span className="current-file-label">📁 Currently processing:</span>
            <span className="current-file-name">
              {deletion.currentFileType === 'video' ? '🎬 Video' : '📄 File'} 
              ({formatSize(deletion.currentFileSize)})
            </span>
            <span className="current-file-progress">
              <FaArrowRight className="pulse-arrow" />
            </span>
          </div>
        )}
      </div>

      <div className="logs-container">
        <h4>📋 Secure Deletion Log</h4>
        <div className="logs-list">
          <AnimatePresence>
            {logs.map((log) => (
              <motion.div 
                key={log.id}
                className="log-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  borderLeft: `3px solid ${getLogColor(log.type)}`
                }}
              >
                <span className="log-time">{log.time}</span>
                <span className="log-icon" style={{ color: getLogColor(log.type) }}>
                  {getLogIcon(log.type)}
                </span>
                <span className="log-message">{log.message}</span>
                {log.size && (
                  <span className="log-size">{formatSize(log.size)}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={logEndRef} />
        </div>
      </div>

      <div className="progress-footer">
        <div className="footer-info">
          <span>📦 Total: {deletion?.totalSteps || 0} items</span>
          <span>|</span>
          <span>📊 {deletion?.currentStep || 0} processed</span>
          <span>|</span>
          <span>💾 {formatSize(deletion?.totalSize || 0)}</span>
          <span>|</span>
          <span>⏱️ {progress >= 100 ? 'Completed!' : `${Math.floor(deletion?.duration || 34)} hours`}</span>
        </div>
        {progress >= 100 && (
          <motion.div 
            className="completion-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <FaCheckCircle />
            <span>✅ Verified</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeletionProgress;

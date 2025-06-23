// Web3 Configuration for Formerly Incarcerated Empowerment Platform

export const SUPPORTED_CHAINS = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    network: 'homestead',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://eth-mainnet.alchemyapi.io/v2/'] },
      public: { http: ['https://cloudflare-eth.com'] },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    network: 'matic',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://polygon-rpc.com'] },
      public: { http: ['https://polygon-rpc.com'] },
    },
    blockExplorers: {
      default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
    },
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    network: 'arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://arb1.arbitrum.io/rpc'] },
      public: { http: ['https://arb1.arbitrum.io/rpc'] },
    },
    blockExplorers: {
      default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
    },
  },
  base: {
    id: 8453,
    name: 'Base',
    network: 'base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://mainnet.base.org'] },
      public: { http: ['https://mainnet.base.org'] },
    },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://basescan.org' },
    },
  },
} as const

export const CONTRACT_ADDRESSES = {
  // Governance Token (SCG)
  GOVERNANCE_TOKEN: {
    ethereum: '0x0000000000000000000000000000000000000000', // To be deployed
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    base: '0x0000000000000000000000000000000000000000',
  },
  
  // DAO Governor Contract
  DAO_GOVERNOR: {
    ethereum: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    base: '0x0000000000000000000000000000000000000000',
  },
  
  // Skill Verification NFT
  SKILL_NFT: {
    ethereum: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    base: '0x0000000000000000000000000000000000000000',
  },
  
  // Job Marketplace
  JOB_MARKETPLACE: {
    ethereum: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    base: '0x0000000000000000000000000000000000000000',
  },
  
  // Micro-Lending Protocol
  MICRO_LENDING: {
    ethereum: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    base: '0x0000000000000000000000000000000000000000',
  },
} as const

export const TOKEN_CONFIG = {
  // Second Chance Governance Token
  SCG: {
    name: 'Second Chance Governance Token',
    symbol: 'SCG',
    decimals: 18,
    totalSupply: '1000000000', // 1 billion tokens
    description: 'Governance token for the Formerly Incarcerated Empowerment Platform',
  },
  
  // Resource Access Token
  RAT: {
    name: 'Resource Access Token',
    symbol: 'RAT',
    decimals: 18,
    description: 'Utility token for accessing platform services and resources',
  },
} as const

export const GOVERNANCE_CONFIG = {
  // Voting parameters
  VOTING_DELAY: 1, // 1 block
  VOTING_PERIOD: 50400, // ~1 week (assuming 12s blocks)
  PROPOSAL_THRESHOLD: '100000', // 100k tokens to create proposal
  QUORUM_PERCENTAGE: 4, // 4% of total supply needed for quorum
  
  // Timelock parameters
  MIN_DELAY: 86400, // 1 day in seconds
  
  // Proposal types
  PROPOSAL_TYPES: {
    STANDARD: 'standard',
    CONSTITUTIONAL: 'constitutional',
    EMERGENCY: 'emergency',
    FUNDING: 'funding',
  },
} as const

export const MARKETPLACE_CONFIG = {
  // Fee structure (in basis points, 100 = 1%)
  PLATFORM_FEE: 250, // 2.5%
  SUCCESS_FEE: 500, // 5% on successful job completion
  
  // Escrow parameters
  ESCROW_TIMEOUT: 2592000, // 30 days in seconds
  DISPUTE_PERIOD: 604800, // 7 days in seconds
  
  // Job categories
  JOB_CATEGORIES: [
    'construction',
    'food-service',
    'retail',
    'warehouse',
    'transportation',
    'cleaning',
    'security',
    'manufacturing',
    'technology',
    'other',
  ],
} as const

export const LENDING_CONFIG = {
  // Interest rates (annual percentage)
  MIN_INTEREST_RATE: 5,
  MAX_INTEREST_RATE: 25,
  DEFAULT_INTEREST_RATE: 12,
  
  // Loan parameters
  MIN_LOAN_AMOUNT: '100', // $100 equivalent
  MAX_LOAN_AMOUNT: '10000', // $10,000 equivalent
  DEFAULT_LOAN_TERM: 365, // 1 year in days
  
  // Risk assessment factors
  REPUTATION_WEIGHT: 0.4,
  COMMUNITY_BACKING_WEIGHT: 0.3,
  COLLATERAL_WEIGHT: 0.2,
  HISTORY_WEIGHT: 0.1,
} as const

export const NFT_CONFIG = {
  // Skill verification categories
  SKILL_CATEGORIES: [
    'construction',
    'culinary',
    'automotive',
    'technology',
    'healthcare',
    'education',
    'business',
    'trades',
    'creative',
    'other',
  ],
  
  // Achievement types
  ACHIEVEMENT_TYPES: [
    'first_job',
    'loan_repaid',
    'mentor_certified',
    'community_contributor',
    'entrepreneur',
    'skill_master',
    'governance_participant',
    'platform_ambassador',
  ],
  
  // Metadata standards
  METADATA_VERSION: '1.0',
  IPFS_GATEWAY: 'https://ipfs.io/ipfs/',
} as const

// Environment-specific configuration
export const getWeb3Config = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  return {
    // Use testnets in development
    defaultChain: isDevelopment ? 'polygon' : 'ethereum',
    
    // API endpoints
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    infuraProjectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    
    // Feature flags
    enableGovernance: process.env.NEXT_PUBLIC_ENABLE_GOVERNANCE === 'true',
    enableLending: process.env.NEXT_PUBLIC_ENABLE_LENDING === 'true',
    enableMarketplace: process.env.NEXT_PUBLIC_ENABLE_MARKETPLACE === 'true',
    enableNFTs: process.env.NEXT_PUBLIC_ENABLE_NFTS === 'true',
  }
}

export type ChainName = keyof typeof SUPPORTED_CHAINS
export type ContractName = keyof typeof CONTRACT_ADDRESSES

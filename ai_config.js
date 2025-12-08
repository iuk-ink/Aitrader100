(function(){
  // 集中管理AI提供商配置与硬性JSON要求，便于统一查看与修改
  window.AI_CONFIG = {
    providers: {
      gemini_flash: {
        url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
        model: 'gemini-2.5-pro',
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 0.95,
        stream: false,
        fallbackJson: { temperature: 0.2, max_tokens: 1024 }
      },
      deepseek: {
        url: 'https://api.deepseek.com/v1/chat/completions',
        model: 'deepseek-reasoner',
        thinking: { type: 'enabled' },
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 0.95,
        stream: false,
        fallbackJson: { temperature: 0.2, max_tokens: 1024 }
      },
      qwen: {
        url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
        model: 'qwen3-max',
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 0.95,
        stream: false,
        fallbackJson: { temperature: 0.2, max_tokens: 1024 }
      }
    },
    requirements: {
      // 人类可读输出格式说明
      outputFormatLine: '输出格式：请用中文给出简洁的交易建议（开/平仓条件、风控、止损止盈），并说明依据。',
      // 机器可读JSON块说明
      jsonBlockIntro: '【机器可读指令（严格JSON）】请在回复末尾追加一个```json 代码块，内容仅为以下结构，不得添加注释或多余字段：',
      // 供提示词中直接插入的JSON模板（字符串数组）
      jsonBlockTemplate: [
        '{"ops": [',
        '  {"action":"open","symbol":"BTCUSDT","side":"long|short","type":"market|limit","price":110000.0,"qty":0.01,"lev":10,"tp":111000.0,"sl":109000.0},',
        '  {"action":"close","symbol":"BTCUSDT"},',
        '  {"action":"set_brackets","symbol":"BTCUSDT","tp":111000.0,"sl":109000.0},',
        '  {"action":"cancel_all","symbol":"BTCUSDT"},',
        '  {"action":"close_all"}',
        ']}',
        '```'
      ],
      jsonBlockExplainLine: '字段含义：open为下单（市价可不填price；限价必须填写price；tp/sl可选），close为平指定交易对持仓，set_brackets为重置该交易对的TP/SL保护单（对冲模式分别作用于LONG/SHORT；市价触发，平掉全部持仓），cancel_all为撤销该交易对全部委托（不含TP/SL），close_all为平掉所有持仓。若需设置初始余额，追加{"action":"set_balance","initialBalance":10000}。',
      // 全局开关：强制所有AI仅输出JSON（DeepSeek式硬要求）
      forceJsonOnly: true,
      // 通用兜底：强制仅输出 JSON 的指令文案（所有AI一致沿用DeepSeek式）
      fallbackJsonInstruction: '请仅输出一个JSON对象，形如 {"ops":[...]} ，不要输出任何其他文本。'
    }
  };
})();

export type AnchorHelloFriends = {
  "version": "0.1.0",
  "name": "anchor_hello_friends",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "messages",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "say",
      "accounts": [
        {
          "name": "messages",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "messages",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "list",
            "type": {
              "vec": {
                "defined": "Message"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "MessageReceived",
      "fields": [
        {
          "name": "message",
          "type": "string",
          "index": false
        }
      ]
    }
  ]
};

export const IDL: AnchorHelloFriends = {
  "version": "0.1.0",
  "name": "anchor_hello_friends",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "messages",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "say",
      "accounts": [
        {
          "name": "messages",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "messages",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "list",
            "type": {
              "vec": {
                "defined": "Message"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "MessageReceived",
      "fields": [
        {
          "name": "message",
          "type": "string",
          "index": false
        }
      ]
    }
  ]
};

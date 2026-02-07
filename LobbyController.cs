using UnityEngine;
using UnityEngine.UI;

public class GameAccountSystem : MonoBehaviour
{
    [Header("Panels")]
    public GameObject loginPanel;
    public GameObject registerPanel;
    public GameObject lobbyPanel;

    [Header("Login UI")]
    public InputField loginUser;
    public InputField loginPass;

    [Header("Register UI")]
    public InputField regUser;
    public InputField regPass;

    [Header("Lobby UI")]
    public Text coinText;
    public Text infoText;

    string savedUser;
    string savedPass;

    int coins;

    // ===== START =====

    void Start()
    {
        LoadData();

        if (savedUser == "")
            ShowRegister();
        else
            ShowLogin();

        UpdateLobbyUI();
    }

    // ===== SAVE / LOAD =====

    void LoadData()
    {
        savedUser = PlayerPrefs.GetString("user", "");
        savedPass = PlayerPrefs.GetString("pass", "");
        coins = PlayerPrefs.GetInt("coins", 0);
    }

    void SaveData()
    {
        PlayerPrefs.SetString("user", savedUser);
        PlayerPrefs.SetString("pass", savedPass);
        PlayerPrefs.SetInt("coins", coins);
        PlayerPrefs.Save();
    }

    // ===== PANEL CONTROL =====

    void HideAll()
    {
        loginPanel.SetActive(false);
        registerPanel.SetActive(false);
        lobbyPanel.SetActive(false);
    }

    public void ShowLogin()
    {
        HideAll();
        loginPanel.SetActive(true);
        infoText.text = "Login akun";
    }

    public void ShowRegister()
    {
        HideAll();
        registerPanel.SetActive(true);
        infoText.text = "Buat akun baru";
    }

    void ShowLobby()
    {
        HideAll();
        lobbyPanel.SetActive(true);
        infoText.text = "Selamat datang!";
        UpdateLobbyUI();
    }

    // ===== REGISTER =====

    public void Register()
    {
        if (regUser.text == "" || regPass.text == "")
        {
            infoText.text = "Isi semua kolom!";
            return;
        }

        infoText.text = "Membuat akun...";
        Invoke(nameof(RegisterSuccess), 1f);
    }

    void RegisterSuccess()
    {
        savedUser = regUser.text;
        savedPass = regPass.text;

        SaveData();

        infoText.text = "Akun dibuat!";
        ShowLogin();
    }

    // ===== LOGIN =====

    public void Login()
    {
        if (loginUser.text == savedUser &&
            loginPass.text == savedPass)
        {
            infoText.text = "Menghubungi server...";
            Invoke(nameof(LoginSuccess), 1f);
        }
        else
        {
            infoText.text = "Username / password salah!";
        }
    }

    void LoginSuccess()
    {
        infoText.text = "Login berhasil!";
        ShowLobby();
    }

    // ===== LOBBY SYSTEM =====

    void UpdateLobbyUI()
    {
        if (coinText != null)
            coinText.text = "Coins: " + coins;
    }

    public void AddCoins()
    {
        int reward = Random.Range(5, 21);

        coins += reward;
        SaveData();
        UpdateLobbyUI();

        infoText.text = "+ " + reward + " coins!";
    }

    // ===== RESET ACCOUNT =====

    public void ResetAccount()
    {
        PlayerPrefs.DeleteAll();
        savedUser = "";
        savedPass = "";
        coins = 0;

        infoText.text = "Akun dihapus";
        ShowRegister();
    }
}